import React, { useState, FC } from "react";
import styles from "./ProjectList.module.css";

interface Project {
  id: number;
  name: string;
}

export const ProjectList: FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ]);

  const handleContextMenu = (event: React.MouseEvent, project: Project) => {
    event.preventDefault();
    console.log(`Context menu for ${project.name}`);
  };

  const handleShare = (project: Project) => {
    console.log(`Share ${project.name}`);
  };

  const handleRename = (project: Project) => {
    const newName = prompt("Enter new name", project.name);
    if (newName) {
      setProjects((prevProjects) =>
        prevProjects.map((p) => (p.id === project.id ? { ...p, name: newName } : p))
      );
    }
  };

  const handleDelete = (project: Project) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== project.id));
  };

  return (
    <div className={styles.projectContainer}>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            onContextMenu={(event) => handleContextMenu(event, project)}
            className={styles.projectItem}
          >
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
