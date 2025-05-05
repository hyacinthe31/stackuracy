export async function getGithubStars(repoUrl: string): Promise<number | null> {
    try {
      const repoPath = new URL(repoUrl).pathname.slice(1);
      const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          "User-Agent": "stackuracy-app"
        },
      });
      const data = await res.json();
      return data.stargazers_count || null;
    } catch (error) {
      console.error("Erreur lors de la récupération des étoiles GitHub", error);
      return null;
    }
  }