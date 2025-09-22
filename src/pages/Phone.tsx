import { useState } from 'react';
import { usePhone } from '../api/hooks/usePhone';
import { Input, Button, Card, Switch } from 'antd';

const Phone = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [memories, setMemories] = useState("");
  const [isDelivery, setIsDelivery] = useState(false);
  const [editingId, setEditingId] = useState("");

  const { getPhone, createPhone, updatePhone, deletePhone } = usePhone();
  const { data } = getPhone();

  const handleSubmit = () => {
    const phone = { title, price, image, memories: memories.split(','), isDelivery };
    if (!title || !price) return;
    if (editingId) {
      updatePhone.mutate({ id: editingId, ...phone });
      setEditingId("");
    } else {
      createPhone.mutate(phone);
    }
    setTitle("");
    setPrice("");
    setImage("");
    setMemories("");
    setIsDelivery(false);
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setPrice(item.price);
    setImage(item.image);
    setMemories(item.memories?.join(', ') || "");
    setIsDelivery(item.isDelivery);
    setEditingId(item.id);
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <Card title="Telefon qo'shish" style={{ borderRadius: 12 }}>
        <Input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Model"
          style={{ marginBottom: 10 }}
        />
        <Input
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Narx"
          style={{ marginBottom: 10 }}
        />
        <Input
          value={image}
          onChange={e => setImage(e.target.value)}
          placeholder="Rasm URL"
          style={{ marginBottom: 10 }}
        />
        <Input
          value={memories}
          onChange={e => setMemories(e.target.value)}
          placeholder="Xotira (8GB, 16GB)"
          style={{ marginBottom: 10 }}
        />
        <div style={{ marginBottom: 10 }}>
          <span style={{ marginRight: 8 }}>Yetkazib berish:</span>
          <Switch checked={isDelivery} onChange={setIsDelivery} />
        </div>
        <Button type="primary" block onClick={handleSubmit}>
          {editingId ? 'Saqlash' : 'Qo‘shish'}
        </Button>
      </Card>
      <div style={{ marginTop: 32 }}>
        {data?.length === 0 && <div style={{ textAlign: 'center', color: '#aaa' }}>Telefonlar yo‘q</div>}
        {data?.map((item: any) => (
          <Card
            key={item.id}
            style={{ marginBottom: 16, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 16 }}
            bodyStyle={{ display: 'flex', alignItems: 'center', width: '100%', padding: 12 }}
          >
            <img
              src={item.image || 'https://via.placeholder.com/48x48?text=No+Img'}
              width="48"
              height="48"
              style={{ objectFit: 'cover', borderRadius: 8, background: '#f5f5f5', border: '1px solid #eee', marginRight: 12 }}
              alt={item.title}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{item.title}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{item.memories?.join(', ')}</div>
              <div style={{ fontWeight: 400 }}>{item.price} so'm</div>
              <div style={{ fontSize: 12, color: item.isDelivery ? '#52c41a' : '#f5222d' }}>
                {item.isDelivery ? 'Yetkazib beriladi' : 'Yetkazib berilmaydi'}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Button size="small" onClick={() => handleEdit(item)}>
                Edit
              </Button>
              <Button size="small" danger onClick={() => deletePhone.mutate(item.id)}>
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Phone;