import {useEffect,useRef,useState,type ReactNode} from 'react';
import {animate,motion,useInView} from 'motion/react';
import {MapPin,Sparkles} from 'lucide-react';
import data from './data.json';
export const fmt=(n:number,d=2)=>n.toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
export const ease=[.16,1,.3,1] as const;
export function PoloSeal({large=false}:{large?:boolean}){return <span className={`polo-seal ${large?'seal-large':''}`}><span className="seal-symbol" aria-hidden="true"><MapPin/></span><span><small>POLO</small><strong>Sarzedo</strong></span></span>}
export function Counter({value,decimals=0,effects}:{value:number;decimals?:number;effects:boolean}){
 const ref=useRef<HTMLSpanElement>(null);const visible=useInView(ref,{once:true,amount:.4});const [shown,setShown]=useState(value);
 useEffect(()=>{if(!effects||!visible){setShown(value);return}const controls=animate(0,value,{duration:1.55,ease,onUpdate:setShown});return()=>controls.stop()},[value,visible,effects]);
 return <span ref={ref} className="counter" aria-label={fmt(value,decimals)} data-value={value}><span aria-hidden="true">{fmt(shown,decimals)}</span></span>
}
export function Reveal({children,className='',effects,delay=0}:{children:ReactNode;className?:string;effects:boolean;delay?:number}){return <motion.div className={className} initial={effects?{opacity:.3,y:44,clipPath:'inset(0 0 8% 0 round 16px)'}:false} whileInView={{opacity:1,y:0,clipPath:'inset(0 0 0% 0 round 0px)'}} viewport={{once:true,amount:.15}} transition={{duration:effects?.9:0,ease,delay:effects?delay:0}}>{children}</motion.div>}
export function SectionTitle({index,title,accent,description,effects}:{index:string;title:string;accent:string;description:string;effects:boolean}){return <Reveal effects={effects} className="section-title numbered-title"><span className="section-index" aria-hidden="true">{index}</span><div><h2>{title} <em>{accent}</em></h2><p>{description}</p></div></Reveal>}
export function ClassTabs({selected,onChange,scope}:{selected:number;onChange:(n:number)=>void;scope:string}){return <div className="class-tabs" role="group" aria-label={`Turma — ${scope}`}>{data.classes.map((c,i)=><button key={c.id} aria-pressed={selected===i} onClick={()=>onChange(i)}>{selected===i&&<motion.span className="tab-light" layoutId={`class-${scope}`} transition={{type:'spring',bounce:.12,duration:.55}}/>}<span className="tab-label">{c.name}</span><span className="tab-count">{c.count} alunos</span></button>)}</div>}
export function PercentageRing({value,effects,label}:{value:number;effects:boolean;label:string}){
 const ref=useRef<HTMLDivElement>(null),inView=useInView(ref,{once:true,amount:.6});const length=2*Math.PI*45;
 return <div ref={ref} className="percentage-ring" role="img" aria-label={`${fmt(value,1)}% ${label}`} data-percent={value}><svg viewBox="0 0 110 110" aria-hidden="true"><circle className="ring-track" cx="55" cy="55" r="45"/><motion.circle className="ring-fill" cx="55" cy="55" r="45" strokeDasharray={length} initial={false} animate={{strokeDashoffset:!effects||inView?length*(1-value/100):length}} transition={{duration:effects?1.6:0,ease}} transform="rotate(-90 55 55)"/></svg><span aria-hidden="true"><Counter value={value} decimals={1} effects={effects}/><small>%</small></span></div>
}
export function AnimatedBar({value,effects}:{value:number;effects:boolean}){const ref=useRef<HTMLSpanElement>(null),visible=useInView(ref,{once:true,amount:.8});return <span ref={ref} className="bar"><motion.span initial={false} animate={{width:`${!effects||visible?value:0}%`}} transition={{duration:effects?1.4:0,ease}} data-percent={value}/></span>}
export function Particles({small=false}:{small?:boolean}){return <div className={`hero-particles ${small?'stage-particles':''}`} aria-hidden="true">{Array.from({length:small?10:20},(_,i)=><i key={i} style={{left:`${6+(i*29)%90}%`,top:`${15+(i*17)%75}%`,animationDelay:`${i*.21}s`,'--drift':`${i%2?22:-22}px`} as React.CSSProperties}/>)}</div>}

export function HonoreeBand({name,index,effects}:{name:string;index:number;effects:boolean}){
 const ref=useRef<HTMLDivElement>(null),visible=useInView(ref,{once:true,amount:.45});
 return <div ref={ref} className="honoree-shell" role="listitem"><motion.p className="honoree-band" initial={false} animate={!effects||visible?{opacity:1,y:0,clipPath:'inset(0 0% 0 0)'}:{opacity:.2,y:20,clipPath:'inset(0 100% 0 0)'}} whileTap={effects?{scale:.975}:{}} transition={{duration:effects?.75:0,delay:effects?index*.14:0,ease}}><span className="honoree-star" aria-hidden="true"><Sparkles size={13}/></span><span>{name}</span></motion.p></div>
}

