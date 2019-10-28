const express = require('express');
const server = express();

server.use(express.json());

const projects = [
    {
        id: '1',
        title: 'Bootcamp GoStack 7',
        tasks: [{
            aprender: ['NodeJS', 'ReactJS', 'React-Native'],
        }]
    },
];

// Cadastra um novo projeto
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };

    projects.push(project);

    return res.json(project);
});


// Retorna todos os projetos cadastrados
server.get('/projects', (req, res) => {
    return res.json(projects);
});


// Editar o título do projeto
server.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(projects);
});

// Deleta um projeto
server.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(p => p.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
});

// Adiciona uma nova tarefa para um projeto especifico
server.post('/projects/:id/tasks', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.tasks.push(title);

    return res.json(project);
});


server.listen(3000);