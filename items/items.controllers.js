const items = []

const GetItems = (req, res) => {
    const query = req.query
    const itemsArray = items
    if(query.size){
        itemsArray = itemsArray.filter(itm => itm.size.includes(query.size))
    }
    if (query.limit) {
        itemsArray = itemsArray.slice(0, req.limit - 1)
    }
    res.status(200).json({
        data: itemsArray
    })
}

const createItems = (req, res) => {
    const item = req.body
    const randomId = Math.floor(Math.random() * 500).toString(); // Generate a random ID
    items.push({id:randomId, ...item})

    return res.status(201).json({
        data : items
    })
}


const getOneItem = (req, res) => {
    const id = req.params.id
    const foundItem = items.find((item)=>{
        return item.id == parseInt(id)
    })
    if(!foundItem){
        return res.status(404).json({
            message : "Item not found"
        })
    }
    res.status(200).json({
        data : foundItem
    })
}


const updateItem = (req, res)=>{
    const id = req.params.id
    const update = req.body
    const foundIndex = items.findIndex(item => item.id == parseInt(id))
    if(foundIndex == -1){
        return res.status(404).json({
            data : `Item with id ${id} not found`
        })
    }
    items[foundIndex] = {...items[foundIndex], ...update}
    res.status(200).json({
        message : "Item updated successfully",
        data : items[foundIndex]
    })
}

const deleteItem = (req,res)=>{
    const id = req.params.id
    const foundIndex = items.findIndex(item=>item.id == parseInt(id))
    if(foundIndex== -1){
        return res.status(404).json({
            data : `Item with id ${id} not found`
        })
    }
    items.splice(foundIndex, 1)
    return res.status(200).json({
        message : "Item deleted successfully"
    })
}


module.exports = {
    GetItems,
    createItems,
    getOneItem,
    updateItem,
    deleteItem
}