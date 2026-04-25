import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, TrendingUp, Users, BarChart3, Bot, ShieldCheck, Database, RefreshCw } from 'lucide-react';
import './style.css';

const creators = [
  { name:'Mahi Eats', handle:'@mahieats', country:'Ethiopia', city:'Addis Ababa', niche:'Food', followers:245000, views:180000, engagement:8.4, growth:12, source:'manual', sync:'hybrid-ready' },
  { name:'Nairobi Trend Lab', handle:'@nairobitrendlab', country:'Kenya', city:'Nairobi', niche:'Lifestyle', followers:510000, views:330000, engagement:6.9, growth:7, source:'manual', sync:'pending' },
  { name:'Kampala Style Edit', handle:'@kampalastyleedit', country:'Uganda', city:'Kampala', niche:'Fashion', followers:118000, views:94000, engagement:9.1, growth:18, source:'manual', sync:'pending' },
  { name:'East Africa Sports Hub', handle:'@easportshub', country:'Ethiopia', city:'Addis Ababa', niche:'Sports', followers:398000, views:201000, engagement:5.8, growth:4, source:'manual', sync:'pending' }
];

const trends = [
  { name:'#AddisFoodRush', type:'Hashtag', region:'Ethiopia', score:92, growth:'+24%' },
  { name:'Weekend Bounce EA', type:'Sound', region:'Kenya', score:88, growth:'+17%' },
  { name:'Street Food Reviews', type:'Niche', region:'East Africa', score:84, growth:'+19%' },
  { name:'Micro Lifestyle Creators', type:'Creator Wave', region:'Uganda', score:79, growth:'+11%' }
];

function format(n){ return n >= 1000 ? Math.round(n/1000)+'K' : n; }

function Stat({label, value, sub, Icon}){
  return <div className="card stat">
    <div><p>{label}</p><h3>{value}</h3><span>{sub}</span></div>
    <div className="icon"><Icon size={20}/></div>
  </div>
}

function CreatorCard({c}){
  return <div className="card creator">
    <div className="row">
      <div>
        <h3>{c.name}</h3>
        <p>{c.handle} · {c.city}, {c.country}</p>
      </div>
      <span className="badge">{c.niche}</span>
    </div>
    <div className="metrics">
      <div><small>Followers</small><b>{format(c.followers)}</b></div>
      <div><small>Avg Views</small><b>{format(c.views)}</b></div>
      <div><small>Engagement</small><b>{c.engagement}%</b></div>
      <div><small>Growth</small><b>+{c.growth}%</b></div>
    </div>
    <div className="row">
      <span className="pill">Source: {c.source}</span>
      <span className="pill">Sync: {c.sync}</span>
    </div>
    <div className="actions">
      <button>View Profile</button><button className="secondary">Add to List</button>
    </div>
  </div>
}

function App(){
  const [page,setPage] = useState('Home');
  const [q,setQ] = useState('');
  const [country,setCountry] = useState('All');

  const filtered = useMemo(()=>creators.filter(c=>{
    const matchCountry = country === 'All' || c.country === country;
    const matchQ = !q || `${c.name} ${c.handle} ${c.niche} ${c.city}`.toLowerCase().includes(q.toLowerCase());
    return matchCountry && matchQ;
  }),[q,country]);

  return <div>
    <nav>
      <div className="brand"><div className="logo">AI</div><div><b>AfriCreator IQ</b><span>East Africa Creator Intelligence</span></div></div>
      <div className="navlinks">
        {['Home','Discover','Trends','AI Match','Admin','Sync Center'].map(x=><button className={page===x?'active':''} onClick={()=>setPage(x)}>{x}</button>)}
      </div>
    </nav>

    <main>
      {page==='Home' && <section className="hero">
        <div>
          <span className="badge dark">Premium B2B intelligence platform</span>
          <h1>Find the right TikTok creators in East Africa with data, rankings, and AI.</h1>
          <p>Built for agencies and brands that need creator discovery, trend intelligence, and campaign shortlists before investing in influencer marketing.</p>
          <div className="actions"><button onClick={()=>setPage('Discover')}>Explore Creators</button><button className="secondary" onClick={()=>setPage('AI Match')}>Try AI Match</button></div>
        </div>
        <div className="panel">
          <h3>Today’s Intelligence Snapshot</h3>
          {trends.map(t=><div className="listitem"><b>{t.name}</b><span>{t.type} · {t.region} · {t.growth}</span></div>)}
        </div>
      </section>}

      {page==='Home' && <div className="grid4">
        <Stat label="Tracked Creators" value="1,248" sub="Manual data now" Icon={Users}/>
        <Stat label="Daily Trends" value="320" sub="Hashtags, sounds, niches" Icon={TrendingUp}/>
        <Stat label="Hybrid Data" value="Ready" sub="Manual + future TikTok sync" Icon={Database}/>
        <Stat label="AI Matching" value="Demo" sub="Creator recommendation engine" Icon={Bot}/>
      </div>}

      {page==='Discover' && <section>
        <h2>Creator Discovery</h2>
        <div className="filters">
          <div className="search"><Search size={18}/><input placeholder="Search creators, niche or city" value={q} onChange={e=>setQ(e.target.value)}/></div>
          <select value={country} onChange={e=>setCountry(e.target.value)}>
            <option>All</option><option>Ethiopia</option><option>Kenya</option><option>Uganda</option>
          </select>
        </div>
        <div className="grid2">{filtered.map(c=><CreatorCard c={c}/>)}</div>
      </section>}

      {page==='Trends' && <section>
        <h2>Trend Intelligence</h2>
        <div className="grid4">{trends.map(t=><div className="card"><span className="badge">{t.type}</span><h3>{t.name}</h3><p>{t.region}</p><div className="score">{t.score}/100 <b>{t.growth}</b></div></div>)}</div>
      </section>}

      {page==='AI Match' && <section className="grid2">
        <div className="card">
          <h2>AI Creator Match</h2>
          <p>Demo prompt:</p>
          <textarea defaultValue="Find high-engagement food creators in Addis Ababa for a restaurant launch campaign." />
          <button>Generate Shortlist</button>
        </div>
        <div className="card">
          <h2>Recommended Creators</h2>
          {creators.slice(0,3).map((c,i)=><div className="listitem"><b>{i+1}. {c.name}</b><span>{c.niche} · Match score {94-i*4}%</span></div>)}
        </div>
      </section>}

      {page==='Admin' && <section>
        <h2>Internal Team Dashboard</h2>
        <div className="grid4">
          <Stat label="Total Creators" value="1,248" sub="Database records" Icon={Users}/>
          <Stat label="Updated Today" value="86" sub="Manual updates" Icon={BarChart3}/>
          <Stat label="Pending Sync" value="23" sub="Future TikTok sync queue" Icon={RefreshCw}/>
          <Stat label="Quality Checked" value="91%" sub="Internal confidence" Icon={ShieldCheck}/>
        </div>
        <div className="card">
          <h3>Add Creator</h3>
          <div className="formgrid">
            <input placeholder="TikTok profile URL"/><input placeholder="Username"/><input placeholder="Country"/><input placeholder="Niche"/><input placeholder="Followers"/><input placeholder="Avg views"/>
          </div>
          <button>Save Creator</button>
        </div>
      </section>}

      {page==='Sync Center' && <section>
        <h2>Manual + Automatic Sync Center</h2>
        <p className="muted">Current MVP uses internal manual data. Future upgrade connects official TikTok sync when approved.</p>
        <div className="card">
          {creators.map(c=><div className="listitem"><b>{c.name}</b><span>source: {c.source} · sync status: {c.sync}</span></div>)}
        </div>
      </section>}
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />);
