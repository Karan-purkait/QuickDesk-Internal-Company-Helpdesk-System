import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

function App() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "IT",
    issue: "",
  });

  const fetchTickets = async () => {
    const res = await axios.get(`${API}/tickets`);
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const submitTicket = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/tickets`, form);
    setForm({ name: "", department: "IT", issue: "" });
    fetchTickets();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/tickets/${id}`, { status });
    fetchTickets();
  };

  return (
    <div className="container">
      <h1>QuickDesk Helpdesk</h1>

      <form className="ticket-form" onSubmit={submitTicket}>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option>IT</option>
          <option>HR</option>
          <option>Admin</option>
        </select>

        <textarea
          placeholder="Describe your issue..."
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          required
        />

        <button type="submit">Submit Ticket</button>
      </form>

      <div className="tickets">
        {tickets.map((t) => (
          <div key={t._id} className={`ticket ${t.status.replace(" ", "")}`}>
            <div className="ticket-header">
              <h3>{t.name}</h3>
              <span className="dept">{t.department}</span>
            </div>
            <p className="issue">{t.issue}</p>
            <div className="ticket-footer">
              <span className="status">{t.status}</span>
              <div className="actions">
                <button onClick={() => updateStatus(t._id, "In Progress")}>
                  In Progress
                </button>
                <button onClick={() => updateStatus(t._id, "Resolved")}>
                  Resolved
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
