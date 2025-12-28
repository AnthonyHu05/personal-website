'use client';

import { useState, useEffect } from 'react';

interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true);
        const response = await fetch('/api/experience');
        
        if (!response.ok) {
          throw new Error('Failed to fetch experiences');
        }
        
        const data = await response.json();
        setExperiences(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
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
        <h1 className="page-title">Experience</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1 className="page-title">Experience</h1>
        <p className="error-text">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Experience</h1>
      
      {experiences.length === 0 ? (
        <p>No experiences found.</p>
      ) : (
        <div className="experience-list">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-card">
              <div className="card-header">
                <h2 className="card-title">{experience.title}</h2>
                <p className="company">{experience.company}</p>
                <p className="location">{experience.location}</p>
              </div>
              
              <div className="date-info">
                <p className="date-text">
                {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                </p>
              </div>
              
              <p className="description">{experience.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}