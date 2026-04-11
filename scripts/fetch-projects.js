require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion Client
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

/**
 * Helper function to extract Notion property values safely
 */
const getVal = (page, propName, type) => {
  const prop = page.properties[propName];
  if (!prop) return null;

  try {
    switch (type) {
      case 'title':
        return prop.title?.[0]?.plain_text || '';
      case 'text':
        return prop.rich_text?.map(t => t.plain_text).join('') || '';
      case 'select':
        return prop.select?.name || '';
      case 'multi':
        return prop.multi_select?.map(s => s.name) || [];
      case 'url':
        return prop.url || '';
      case 'date':
        return prop.date || null;
      default:
        return null;
    }
  } catch (error) {
    return null;
  }
};

async function fetchProjects() {
  if (!DATABASE_ID || !process.env.NOTION_API_KEY) {
    console.error("ERROR: NOTION_API_KEY and NOTION_DATABASE_ID must be set in .env file.");
    process.exit(1);
  }

  console.log('Fetching projects from Notion...');

  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ],
    });

    const projects = response.results.map((page, index) => {
      // Map properties based on new Notion structure
      const title = getVal(page, 'Name', 'title');
      const platform = getVal(page, 'Platform', 'select') || 'Project';
      const role = getVal(page, 'Role', 'select') || '';
      const description = getVal(page, 'Short Description', 'text');
      const techStack = getVal(page, 'Tech Stack', 'multi');
      const github = getVal(page, 'URL Source Code', 'url');
      const demo = getVal(page, 'URL Demo', 'url');
      const docs = getVal(page, 'URL Documentation', 'url');
      const folderName = getVal(page, 'Thumbnail Folder', 'text');
      const featText = getVal(page, 'Features', 'text');
      const status = getVal(page, 'Status', 'select');
      
      // Parsing Date
      const dateObj = getVal(page, 'Date', 'date');
      let duration = 'Ongoing';
      if (dateObj && dateObj.start) {
        const formatOptions = { month: 'short', year: 'numeric' };
        const startStr = new Date(dateObj.start).toLocaleDateString('en-US', formatOptions);
        if (dateObj.end) {
          const endStr = new Date(dateObj.end).toLocaleDateString('en-US', formatOptions);
          duration = `${startStr} - ${endStr}`;
        } else {
          duration = startStr;
        }
      }

      // Auto-discover images based on "Thumbnail Folder"
      let finalImage = '';
      let finalScreenshots = [];

      if (folderName) {
        const folderPath = folderName.trim();
        const projectImagesDir = path.resolve(__dirname, `../assets/images/${folderPath}`);

        if (fs.existsSync(projectImagesDir)) {
          const files = fs.readdirSync(projectImagesDir);
          const imageFiles = files.filter(f => f.match(/\.(png|jpe?g|gif|webp)$/i));

          if (imageFiles.length > 0) {
            // Priority: 'cover' -> 'thumb' -> Folder Name -> First File
            const thumb = imageFiles.find(f => 
              f.toLowerCase().startsWith('cover.') || 
              f.toLowerCase().includes('cover') ||
              f.toLowerCase().includes('thumb') || 
              f.toLowerCase().includes(folderPath.toLowerCase())
            ) || imageFiles[0];

            finalImage = `./assets/images/${folderPath}/${thumb}`;
            
            // Filter out the thumb image from the screenshots gallery to avoid duplication
            finalScreenshots = imageFiles
              .filter(f => f !== thumb)
              .map(f => `./assets/images/${folderPath}/${f}`);
          }
        }
      }

      return {
        id: index + 1,
        title,
        description,
        image: finalImage,
        screenshots: finalScreenshots,
        tags: techStack,
        category: platform,
        role,
        duration,
        status: status || 'Completed',
        features: featText ? featText.split(',').map(f => f.trim()) : [],
        techStack: {
          technologies: techStack
        },
        links: {
          github: github || undefined,
          live: demo || undefined,
          documentation: docs || page.url // Menggunakan field Notion jika ada, fallback ke URL Page
        }
      };
    }).filter(project => project.status === 'Completed');

    const outputPath = path.resolve(__dirname, '../assets/js/projects-data.js');
    const fileContent = `const projectsData = ${JSON.stringify(projects, null, 2)};\n`;

    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    console.log(`successfully synced ${projects.length} projects to assets/js/projects-data.js`);

  } catch (error) {
    console.error("Error fetching from Notion:", error.message);
  }
}

fetchProjects();
