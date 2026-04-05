require('dotenv').config();
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Initialize Notion Client
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Helper function to extract Notion property values safely
const getVal = (page, propName, type) => {
  const prop = page.properties[propName];
  if (!prop) return null;

  try {
    switch (type) {
      case 'title':
        return prop.title?.[0]?.plain_text || '';
      case 'text':
      case 'rich_text':
        return prop.rich_text?.map(t => t.plain_text).join('') || '';
      case 'select':
        return prop.select?.name || '';
      case 'multi_select':
        return prop.multi_select?.map(s => s.name) || [];
      case 'url':
        return prop.url || '';
      case 'number':
        return prop.number || 0;
      default:
        return null;
    }
  } catch (error) {
    console.warn(`Warning: Could not parse property "${propName}" for page ${page.id}`);
    return null;
  }
};

async function fetchProjects() {
  if (!DATABASE_ID || !process.env.NOTION_API_KEY) {
    console.error("❌ ERROR: NOTION_API_KEY and NOTION_DATABASE_ID must be set in .env file.");
    process.exit(1);
  }

  console.log('🔄 Fetching projects from Notion...');
  
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      // You can add sorts or filters here, for example only fetch published projects
      // filter: { property: "Status", select: { equals: "Completed" } },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    const projects = response.results.map((page, index) => {
      // Basic mappings
      const title = getVal(page, 'Name', 'title') || 'Untitled Project';
      
      // We map "Tag" to Category based on user's Notion setup (if it's array take first item)
      let rawTags = getVal(page, 'Tag', 'multi_select') || [];
      let category = '';
      if(rawTags.length > 0) {
          category = rawTags[0];
      } else {
          category = getVal(page, 'Category', 'select') || 'Uncategorized'; // Fallback
      }

      const description = getVal(page, 'Short Description', 'rich_text');
      
      // Extract links
      const liveLink = getVal(page, 'URL Demo', 'url');
      const githubLink = getVal(page, 'URL Source Code', 'url');
      
      // Newly added properties (you manually created these)
      const image = getVal(page, 'Thumbnail Image', 'rich_text') || '';
      
      // Parse screenshots (comma separated strings)
      const screenshotsStr = getVal(page, 'Screenshots', 'rich_text') || '';
      const screenshots = screenshotsStr ? screenshotsStr.split(',').map(s => s.trim()).filter(Boolean) : [];
      
      // Parse features
      const featuresStr = getVal(page, 'Features', 'rich_text') || '';
      const features = featuresStr ? featuresStr.split(',').map(s => s.trim()).filter(Boolean) : [];
      
      const techStackFrontend = getVal(page, 'Tech Stack', 'multi_select') || [];
      
      const status = getVal(page, 'Status & Duration', 'rich_text') || 'Completed'; // Fallback logic
      let finalStatus = 'Completed';
      let finalDuration = 'Unknown';
      if(status.includes('-')) {
        const parts = status.split('-');
        finalStatus = parts[0].trim();
        finalDuration = parts[1].trim();
      } else {
        finalStatus = status;
      }

      return {
        id: index + 1, // sequential ID or parse from Notion if you created an ID property
        title,
        description,
        image,
        screenshots,
        tags: techStackFrontend, // Using tech stack as tags for the card tags
        category,
        duration: finalDuration,
        status: finalStatus,
        features: features.length > 0 ? features : ["Feature 1", "Feature 2"], // fallback
        techStack: {
          technologies: techStackFrontend
        },
        links: {
          github: githubLink || undefined,
          live: liveLink || undefined,
        }
      };
    });

    console.log(`✅ successfully fetched ${projects.length} projects.`);

    // Write to assets/js/projects-data.js
    const outputPath = path.resolve(__dirname, '../assets/js/projects-data.js');
    const fileContent = `const projectsData = ${JSON.stringify(projects, null, 2)};\n\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = projectsData;\n}\n`;

    fs.writeFileSync(outputPath, fileContent, 'utf-8');
    
    console.log(`✅ Updated js data file at: ${outputPath}`);
    
  } catch (error) {
    console.error("❌ Error fetching from Notion:", error.message);
  }
}

fetchProjects();
