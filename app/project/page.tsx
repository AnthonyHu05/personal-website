'use client';

import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  link?: string;
  githubLink?: string;
  imageUrl?: string;
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch('/api/project');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1 className="page-title">Projects</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1 className="page-title">Projects</h1>
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Projects</h1>
      
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <h2 className="card-title">{project.name}</h2>
              </div>
              
              <p className="description">{project.description}</p>
              
              <div className="date-info">
                <p className="date-text">
                {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
                </p>
              </div>
              
              <div className="links-container">
                {project.link && (
                  <div className="link-container">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="deployment-link"
                    >
                      Deployment Link →
                    </a>
                  </div>
                )}
                
                {project.githubLink && (
                  <div className="link-container">
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="deployment-link"
                    >
                      Github Link →
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}