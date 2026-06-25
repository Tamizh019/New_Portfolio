import type { Context } from "@netlify/functions";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

export default async (req: Request, context: Context) => {
  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: corsHeaders
    });
  }

  // Validate Admin Password
  const password = req.headers.get("x-admin-password");
  const serverPassword = process.env.ADMIN_PASSWORD;

  if (!serverPassword) {
    return new Response(JSON.stringify({ error: "Admin password not configured on server." }), {
      status: 500,
      headers: corsHeaders
    });
  }

  if (!password || password !== serverPassword) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: corsHeaders
    });
  }

  // Validate GitHub configuration
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return new Response(JSON.stringify({ error: "GitHub integration GITHUB_TOKEN not configured on server." }), {
      status: 500,
      headers: corsHeaders
    });
  }

  try {
    const payload = await req.json();
    if (!payload || typeof payload !== "object") {
      return new Response(JSON.stringify({ error: "Invalid data payload" }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const owner = "Tamizh019";
    const repo = "New_Portfolio";
    const path = "constants.ts";

    // 1. Fetch current file metadata from GitHub to obtain the current SHA
    const githubGetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const getRes = await fetch(githubGetUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github+json",
        "User-Agent": "Netlify-Serverless-App",
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });

    if (!getRes.ok) {
      const errorText = await getRes.text();
      return new Response(
        JSON.stringify({ error: `Failed to fetch file SHA from GitHub: ${getRes.statusText}`, details: errorText }),
        { status: 502, headers: corsHeaders }
      );
    }

    const getResJSON: any = await getRes.json();
    const sha = getResJSON.sha;

    // 2. Format the new TS content
    const cleanJSON = JSON.stringify(payload, null, 2);
    const fileContent = `import { UserData } from './types';\n\nexport const PORTFOLIO_DATA: UserData = ${cleanJSON};\n`;
    const base64Content = Buffer.from(fileContent, "utf-8").toString("base64");

    // 3. PUT request to GitHub to commit the update
    const putRes = await fetch(githubGetUrl, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${githubToken}`,
        "Accept": "application/vnd.github+json",
        "User-Agent": "Netlify-Serverless-App",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "chore: update portfolio constants via Admin panel",
        content: base64Content,
        sha: sha
      })
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      return new Response(
        JSON.stringify({ error: `Failed to commit to GitHub: ${putRes.statusText}`, details: errorText }),
        { status: 502, headers: corsHeaders }
      );
    }

    const putResJSON: any = await putRes.json();
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Portfolio data successfully committed to GitHub!",
        commit: putResJSON.commit?.html_url || "" 
      }), 
      { status: 200, headers: corsHeaders }
    );

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || "Internal server error" }), {
      status: 500,
      headers: corsHeaders
    });
  }
};
