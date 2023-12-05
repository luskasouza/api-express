import express from 'express';

const app = express();
app.use(express.json());

const mesas = [
    {id: 1, number: '01', status: 'active'},
    {id: 2, number: '03', status: 'active'},
    {id: 3, number: '11', status: 'active'},
];
function searchTables(id) {
    const data = mesas.findIndex(item => {
        return item.id === Number(id);
    });
    return data ?? [];
}

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node.js');
});

app.put('/mesas/:id', (req, res) => {
    const index = searchTables(req.params.id);
    mesas[index].number = req.body.number;
    return res.status(200).json(mesas);
});



app.get('/mesas/:id', (req, res) => {
    const index = searchTables(req.params.id);
    res.status(200).json(mesas[index]);
});

app.get('/mesas', (req, res) => {
    res.status(200).json(mesas);
});

app.post('/mesas', (req, res) => {
     const { number, status } = req.body;

     const newId = mesas.length + 1;
   
     const newMesa = {
        id: newId,
        number: number,
        status: status,
    };

     mesas.push(newMesa);

     res.status(201).send('Mesa criada com sucesso');
});

export default app;