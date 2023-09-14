const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// rray to store JSON data
let jsonDataStore = [];



// GET Request 
app.get('/api', (req, res) => {
  try {
    res.json(jsonDataStore);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST Request 
app.post('/api', (req, res) => {
  try {
    const newJsonData = req.body; 

    jsonDataStore.push(newJsonData);

    res.json({ message: 'JSON data created successfully', data: newJsonData });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT Request 
app.put('/api/:id', (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedJsonData = req.body; 
    const idToFind = parseInt(idToUpdate);

 
    const jsonDataToUpdate = jsonDataStore.find((item)   => item.id === idToFind);

    if (!jsonDataToUpdate) {
      return res.status(404).json({ message: 'JSON data not found',id:idToFind ,json:jsonDataStore});
    }

    
    Object.assign(jsonDataToUpdate, updatedJsonData);

    res.json({ message: 'JSON data updated successfully', data: jsonDataToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE Request 
app.delete('/api/:id', (req, res) => {
  try {
    const idToDelete = req.params.id;
    const idToFind = parseInt(idToDelete);

    
    const jsonDataToDeleteIndex = jsonDataStore.findIndex((item) => item.id === idToFind);

    if (jsonDataToDeleteIndex === -1) {
      return res.status(404).json({ message: 'JSON data not found' });
    }

   
    jsonDataStore.splice(jsonDataToDeleteIndex, 1);

    res.json({ message: 'JSON data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
