import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import { Button } from '@mui/material';

export default function EducationPortal() {
  const [classes, setClasses] = useState(['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5']);
  const [categories, setCategories] = useState(['Abacus', 'Vedic Maths', 'Robotics', 'AI', 'NEP']);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (selectedClass && selectedCategory) {
      fetchContent();
    }
  }, [selectedClass, selectedCategory]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/content.json');
      const data = await response.json();
      const filteredContent = data.filter(item => item.class === selectedClass && item.category === selectedCategory);
      setContent(filteredContent);
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Typography variant="h4" className="mb-4">Education Portal</Typography>
      <div className="grid grid-cols-2 gap-4">
        <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} fullWidth>
          {classes.map(cls => (
            <MenuItem key={cls} value={cls}>{cls}</MenuItem>
          ))}
        </Select>
        <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} fullWidth>
          {categories.map(cat => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </div>
      <Button variant="contained" color="primary" onClick={fetchContent} className="mt-4">Fetch Content</Button>
      <div className="mt-6">
        {content.length > 0 ? (
          content.map((item, index) => (
            <Card key={index} className="mb-4">
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography>{item.description}</Typography>
                {item.fileUrl && <a href={item.fileUrl} target="_blank" className="text-blue-500">View File</a>}
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography color="textSecondary">No content found.</Typography>
        )}
      </div>
    </div>
  );
}
