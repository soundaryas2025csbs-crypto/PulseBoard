import React, { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, CalendarDays, Check, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Clock3, Command, FolderKanban, LayoutDashboard,
  ListTodo, LogOut, Menu, MoreHorizontal, Plus, Search, Settings, Sparkles, Target,
  TrendingUp, Users, X, Zap, CheckCircle2, Circle, SlidersHorizontal
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  BarChart, Bar, Cell
} from "recharts";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader } from "./components/ui/card";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My projects", icon: FolderKanban, count: "4" },
  { label: "Tasks", icon: ListTodo },
  { label: "Team", icon: Users },
];
const initialTasks = [
  { id: 1, title: "Review the new landing page", project: "Website refresh", date: "Today", color: "violet", done: false },
  { id: 2, title: "Prepare weekly progress notes", project: "Team operations", date: "Today", color: "orange", done: false },
  { id: 3, title: "Share feedback with design team", project: "Mobile app", date: "Tomorrow", color: "pink", done: true },
  { id: 4, title: "Update project timeline", project: "Website refresh", date: "Nov 28", color: "blue", done: false },
];
const chartData = [
  { day: "Mon", current: 32, previous: 22 }, { day: "Tue", current: 48, previous: 35 },
  { day: "Wed", current: 40, previous: 29 }, { day: "Thu", current: 66, previous: 43 },
  { day: "Fri", current: 54, previous: 38 }, { day: "Sat", current: 78, previous: 49 },
  { day: "Sun", current: 70, previous: 44 },
];
const barData = [
  { name: "Design", value: 82, color: "#8b5cf6" }, { name: "Build", value: 64, color: "#fb923c" },
  { name: "Review", value: 48, color: "#ec4899" }, { name: "Launch", value: 35, color: "#38bdf8" },
];

function Avatar({ initials, color = "bg-violet-100 text-violet-700", small = false }) {
  return <div className={`${small ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs"} grid shrink-0 place-items-center rounded-full font-bold ring-2 ring-white ${color}`}>{initials}</div>;
}
function MetricCard({ title, value, change, positive, icon: Icon, tone, note }) {
  return <Card className="metric-card min-w-0">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon size={18}/></span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div><div className="font-display text-[29px] font-extrabold tracking-tight text-slate-900">{value}</div><div className="mt-1 text-xs text-slate-400">{note}</div></div>
        <span className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
          {positive ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>} {change}
        </span>
      </div>
    </CardContent>
  </Card>;
}
function Sidebar({ active, setActive, open, setOpen }) {
  return <>
    {open && <button aria-label="Close menu" className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`sidebar fixed inset-y-0 left-0 z-40 flex w-[258px] flex-col border-r border-slate-100 bg-white px-5 pb-5 pt-6 transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3"><div className="brand-mark grid h-10 w-10 place-items-center rounded-[14px] text-white"><Activity size={21} strokeWidth={2.7}/></div><div><div className="font-display text-[19px] font-extrabold tracking-tight text-slate-900">pulse<span className="text-violet-600">board</span></div><div className="text-[10px] font-semibold uppercase tracking-[.19em] text-slate-400">Your space to do</div></div></div>
        <button className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(false)}><X size={18}/></button>
      </div>
      <div className="mt-10">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</p>
        <nav className="space-y-1">
          {navItems.map(({ label, icon: Icon, count }) => <button key={label} onClick={() => { setActive(label); setOpen(false); }} className={`nav-link group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${active === label ? "active-nav" : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"}`}><Icon size={18}/><span className="flex-1">{label}</span>{count && <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">{count}</span>}</button>)}
        </nav>
      </div>
      <div className="mt-9">
        <div className="mb-3 flex items-center justify-between px-3"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Tools</p><Plus size={14} className="text-slate-400"/></div>
        <button onClick={() => setActive("Calendar")} className={`nav-link flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active === "Calendar" ? "active-nav" : "text-slate-500 hover:bg-slate-50"}`}><CalendarDays size={18}/>Calendar</button>
        <button onClick={() => setActive("Reports")} className={`nav-link flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${active === "Reports" ? "active-nav" : "text-slate-500 hover:bg-slate-50"}`}><TrendingUp size={18}/>Reports</button>
      </div>
      <div className="mt-auto">
        <div className="help-card rounded-2xl p-4">
          <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-white/20 text-white"><Sparkles size={18}/></div>
          <p className="font-display text-sm font-bold text-white">Make room for good ideas.</p>
          <p className="mt-1 text-xs leading-5 text-white/75">A little progress each day adds up.</p>
          <button className="mt-3 text-xs font-bold text-white underline decoration-white/50 underline-offset-4" onClick={() => setActive("Reports")}>Explore insights</button>
        </div>
        <div className="mt-5 space-y-1 border-t border-slate-100 pt-4">
          <button onClick={() => setActive("Settings")} className="nav-link flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50"><Settings size={17}/>Settings</button>
          <button onClick={() => setActive("Help")} className="nav-link flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50"><CircleHelp size={17}/>Help center</button>
        </div>
      </div>
    </aside>
  </>;
}
function Header({ active, onMenu, query, setQuery, onAdd }) {
  return <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-100/80 bg-[#f8f8fc]/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
    <div className="flex min-w-0 items-center gap-3"><button onClick={onMenu} className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 lg:hidden"><Menu size={18}/></button><div className="min-w-0"><div className="hidden text-[11px] font-semibold text-slate-400 sm:block">Workspace / <span className="text-violet-600">{active}</span></div><h1 className="truncate font-display text-lg font-extrabold text-slate-900 sm:mt-0.5">{active}</h1></div></div>
    <div className="flex items-center gap-2 sm:gap-3">
      <label className="hidden h-10 w-48 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 md:flex lg:w-60"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search anything..." className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"/><kbd className="rounded border border-slate-200 px-1.5 py-0.5 text-[9px]">⌘ K</kbd></label>
      <button aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"><Bell size={17}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500 ring-2 ring-white"/></button>
      <div className="mx-1 hidden h-8 w-px bg-slate-200 sm:block"/>
      <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white"><Avatar initials="SK" color="bg-orange-100 text-orange-700"/><span className="hidden text-left sm:block"><span className="block text-xs font-bold text-slate-800">Sam Kelly</span><span className="block text-[10px] text-slate-400">Personal space</span></span><ChevronDown size={14} className="hidden text-slate-400 sm:block"/></button>
    </div>
  </header>;
}
function Overview({ tasks, toggleTask, query, onAdd }) {
  const visibleTasks = tasks.filter(t => `${t.title} ${t.project}`.toLowerCase().includes(query.toLowerCase()));
  const completed = tasks.filter(t => t.done).length;
  return <div className="mx-auto max-w-[1500px] space-y-6 p-4 sm:p-7 lg:p-9">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700"><span className="h-1.5 w-1.5 rounded-full bg-violet-500"/> Tuesday, November 25, 2026</div><h2 className="font-display text-[27px] font-extrabold tracking-tight text-slate-900 sm:text-[32px]">Good evening, Sam <span className="wave">✦</span></h2><p className="mt-1 text-sm text-slate-500">Here’s what’s happening in your workspace today.</p></div>
      <Button onClick={onAdd}><Plus size={16}/> Create new</Button>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard title="Active projects" value="12" change="12.8%" positive icon={FolderKanban} tone="bg-violet-50 text-violet-600" note="Compared to last month"/>
      <MetricCard title="Tasks completed" value={`${completed + 28}`} change="8.2%" positive icon={CheckCircle2} tone="bg-emerald-50 text-emerald-600" note="Across all your projects"/>
      <MetricCard title="Hours tracked" value="164.5" change="4.3%" positive icon={Clock3} tone="bg-orange-50 text-orange-600" note="This month so far"/>
      <MetricCard title="Team productivity" value="86%" change="2.4%" positive={false} icon={Zap} tone="bg-pink-50 text-pink-600" note="A little room to grow"/>
    </div>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,1fr)]">
      <Card>
        <CardHeader><div><h3 className="font-display text-base font-extrabold text-slate-900">Your activity</h3><p className="mt-1 text-xs text-slate-400">A look at your weekly progress</p></div><button className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">This week <ChevronDown size={13}/></button></CardHeader>
        <CardContent><div className="mb-3 flex items-center gap-5"><div><span className="font-display text-2xl font-extrabold text-slate-900">68.4%</span><span className="ml-2 text-[11px] font-bold text-emerald-600">+6.4%</span></div><div className="flex items-center gap-3 text-[10px] text-slate-400"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-violet-500"/>This week</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-orange-300"/>Last week</span></div></div>
          <div className="h-[230px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top:8,right:5,left:-22,bottom:0}}><defs><linearGradient id="currentFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.22}/><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#f1f0f7" strokeDasharray="4 5" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize:11,fill:"#9ca3af"}} dy={10}/><YAxis axisLine={false} tickLine={false} tick={{fontSize:10,fill:"#a1a1aa"}}/><Tooltip contentStyle={{border:"1px solid #eeeaf7",borderRadius:12,fontSize:12,boxShadow:"0 8px 25px #312e8110"}}/><Area type="monotone" dataKey="previous" stroke="#fdba74" strokeWidth={2} strokeDasharray="4 4" fill="transparent"/><Area type="monotone" dataKey="current" stroke="#8b5cf6" strokeWidth={2.8} fill="url(#currentFill)" activeDot={{r:5,strokeWidth:0}}/></AreaChart></ResponsiveContainer></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><div><h3 className="font-display text-base font-extrabold text-slate-900">Project progress</h3><p className="mt-1 text-xs text-slate-400">Current sprint overview</p></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18}/></button></CardHeader>
        <CardContent><div className="mb-4 flex items-center justify-between rounded-xl bg-[#faf8ff] p-3"><div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Overall completion</p><p className="mt-1 font-display text-2xl font-extrabold text-slate-900">57.2%</p></div><div className="grid h-11 w-11 place-items-center rounded-full bg-violet-100 text-violet-700"><Target size={20}/></div></div>
          <div className="h-[150px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={barData} layout="vertical" margin={{top:0,right:0,left:-20,bottom:0}}><XAxis type="number" hide domain={[0,100]}/><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:11,fill:"#64748b"}} width={65}/><Tooltip cursor={{fill:"#f8f7fc"}} contentStyle={{borderRadius:10,fontSize:11}}/><Bar dataKey="value" radius={[0,6,6,0]} barSize={12}>{barData.map((entry,i)=><Cell key={i} fill={entry.color}/>)}</Bar></BarChart></ResponsiveContainer></div>
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,1fr)]">
      <Card>
        <CardHeader><div><h3 className="font-display text-base font-extrabold text-slate-900">My tasks</h3><p className="mt-1 text-xs text-slate-400">A few things on your plate</p></div><button className="text-xs font-bold text-violet-600 hover:text-violet-800">View all <span aria-hidden="true">↗</span></button></CardHeader>
        <CardContent className="pt-3"><div className="space-y-1">{visibleTasks.map(task=><div key={task.id} className="task-row flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-slate-50"><button onClick={()=>toggleTask(task.id)} aria-label={task.done ? "Mark incomplete" : "Mark complete"} className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition ${task.done ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 text-transparent hover:border-violet-500"}`}>{task.done && <Check size={12}/>}</button><div className="min-w-0 flex-1"><p className={`truncate text-sm font-semibold ${task.done ? "text-slate-400 line-through" : "text-slate-700"}`}>{task.title}</p><p className="mt-1 text-[10px] text-slate-400">{task.project}</p></div><span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${task.color === "orange" ? "bg-orange-50 text-orange-600" : task.color === "pink" ? "bg-pink-50 text-pink-600" : task.color === "blue" ? "bg-sky-50 text-sky-600" : "bg-violet-50 text-violet-600"}`}>{task.date}</span><button className="rounded-lg p-1.5 text-slate-300 hover:bg-white hover:text-slate-600"><MoreHorizontal size={16}/></button></div>)}</div></CardContent>
      </Card>
      <Card>
        <CardHeader><div><h3 className="font-display text-base font-extrabold text-slate-900">Team activity</h3><p className="mt-1 text-xs text-slate-400">What everyone’s been up to</p></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18}/></button></CardHeader>
        <CardContent className="pt-4"><div className="space-y-5">
          {[{i:"AM",n:"Alex Morgan",a:"completed the design review",t:"12 min ago",c:"bg-orange-100 text-orange-700"},{i:"JR",n:"Jamie Rivera",a:"added 3 new tasks",t:"48 min ago",c:"bg-sky-100 text-sky-700"},{i:"TC",n:"Taylor Chen",a:"shared a project update",t:"2 hours ago",c:"bg-pink-100 text-pink-700"}].map((person,i)=><div className="flex items-start gap-3" key={person.i}><Avatar initials={person.i} color={person.c}/><div className="min-w-0 flex-1"><p className="text-xs leading-5 text-slate-600"><span className="font-bold text-slate-800">{person.n}</span> {person.a}</p><p className="mt-1 text-[10px] text-slate-400">{person.t}</p></div><span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400"/></div>)}
        </div><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div className="flex -space-x-2"><Avatar initials="AM" small color="bg-orange-100 text-orange-700"/><Avatar initials="JR" small color="bg-sky-100 text-sky-700"/><Avatar initials="TC" small color="bg-pink-100 text-pink-700"/><Avatar initials="SK" small/></div><span className="text-[10px] font-semibold text-slate-400">+ 5 teammates</span></div></CardContent>
      </Card>
    </div>
    <footer className="flex flex-col justify-between gap-2 pb-2 text-[10px] text-slate-400 sm:flex-row"><span>© 2026 PulseBoard. Made for better workdays.</span><span className="flex items-center gap-1">A little more clarity, every day <Sparkles size={11} className="text-violet-400"/></span></footer>
  </div>;
}
function SimplePage({ active, onAdd }) {
  const descriptions = {
    "My projects": "Keep every idea moving, from first draft to final delivery.",
    Tasks: "Your to-do list, without the mental clutter.",
    Team: "Good work happens when everyone is in sync.",
    Calendar: "A clear view of what’s coming up.",
    Reports: "Small insights that help you make better decisions.",
    Settings: "Make your workspace feel like yours.",
    Help: "Find a hand when you need one.",
  };
  return <div className="mx-auto max-w-[1100px] p-4 sm:p-7 lg:p-9"><div className="mb-7"><span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-700">Your workspace</span><h2 className="mt-3 font-display text-3xl font-extrabold text-slate-900">{active}</h2><p className="mt-2 text-sm text-slate-500">{descriptions[active] || "Your workspace at a glance."}</p></div><Card><CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-violet-50 text-violet-600"><Sparkles size={27}/></div><h3 className="mt-5 font-display text-lg font-extrabold text-slate-900">Your {active.toLowerCase()} space is ready</h3><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">This section is ready for your next update. Add something new and keep your momentum going.</p><Button className="mt-5" onClick={onAdd}><Plus size={15}/> Add new item</Button></CardContent></Card></div>;
}
export default function App() {
  const [active, setActive] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState("");
  const toggleTask = id => setTasks(current => current.map(t => t.id === id ? {...t, done: !t.done} : t));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(current => [{id: Date.now(), title: newTask.trim(), project: "Personal workspace", date: "Today", color: "violet", done: false}, ...current]);
    setNewTask(""); setShowCreate(false);
  };
  return <div className="min-h-screen bg-[#f8f8fc] text-slate-800">
    <div className="flex min-h-screen">
      <Sidebar active={active} setActive={setActive} open={menuOpen} setOpen={setMenuOpen}/>
      <main className="min-w-0 flex-1">
        <Header active={active} onMenu={()=>setMenuOpen(true)} query={query} setQuery={setQuery} onAdd={()=>setShowCreate(true)}/>
        {active === "Overview" ? <Overview tasks={tasks} toggleTask={toggleTask} query={query} onAdd={()=>setShowCreate(true)}/> : <SimplePage active={active} onAdd={()=>setShowCreate(true)}/>}
      </main>
    </div>
    {showCreate && <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/35 p-4 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)setShowCreate(false)}}><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><div><h3 className="font-display text-lg font-extrabold text-slate-900">Add a task</h3><p className="mt-1 text-xs text-slate-400">Put your next step into motion.</p></div><button onClick={()=>setShowCreate(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={17}/></button></div><input autoFocus value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTask()} placeholder="What needs to get done?" className="mt-6 h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"/><div className="mt-5 flex justify-end gap-2"><Button variant="outline" onClick={()=>setShowCreate(false)}>Cancel</Button><Button onClick={addTask} disabled={!newTask.trim()}>Create task <Plus size={15}/></Button></div></div></div>}
  </div>;
}