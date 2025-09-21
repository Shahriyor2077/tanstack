import { useState } from 'react';
import { usePhone } from '../api/hooks/usePhone';
import { Input, Button, Card } from 'antd';

const Phone = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [memories, setMemories] = useState("")
    const [isDelivery, setIsDelivery] = useState(false)
    const [editingId, setEditingId] = useState("")
    
    const {getPhone, createPhone, updatePhone, deletePhone}=usePhone()
    const {data}=getPhone()

    const handleSubmit = () => {
        const phone = { title, price, image, memories: memories.split(','), isDelivery }
        
        if (editingId) {
            updatePhone.mutate({ id: editingId, ...phone })
            setEditingId("")
        } else {
            createPhone.mutate(phone)
        }
        
        setTitle("")
        setPrice("")
        setImage("")
        setMemories("")
        setIsDelivery(false)
    }

    const handleEdit = (item: any) => {
        setTitle(item.title)
        setPrice(item.price)
        setImage(item.image)
        setMemories(item.memories?.join(', ') || "")
        setIsDelivery(item.isDelivery)
        setEditingId(item.id)
    }


  return (
    <Card title="Phone CRUD">
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Model" />
      <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
      <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
      <Input value={memories} onChange={(e) => setMemories(e.target.value)} placeholder="Memory" />
      <input type="checkbox" checked={isDelivery} onChange={(e) => setIsDelivery(e.target.checked)} />
      <Button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</Button>
      
      <div>
        {data?.map((item: any) => (
          <div key={item.id}>
            <img src={item.image} width="50" />
            <span>Model: {item.title}</span>
            <span>Narx: {item.price}</span>
            <span>Xotira: {item.memories?.join(', ')}</span>
            <span>Delivery: {item.isDelivery ? 'Yes' : 'No'}</span>
            <Button onClick={() => handleEdit(item)}>Edit</Button>
            <Button onClick={() => deletePhone.mutate(item.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Phone;