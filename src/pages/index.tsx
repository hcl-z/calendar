'use client';
import styles from '../styles/page.module.scss'
import Card from '../components/Card';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/router';

const colors = ['#96514d', '#38b48b', '#bc64a4', '#cd8c5c', "#F7DC6F", // Warm Beige
  "#F5B7B1", // Coral Pink
  "#D7BDE2", // Lavender Purple
  "#AED6F1", // Sky Blue
  "#ABEBC6", // Mint Green
  "#F9E79F", // Lemon Yellow
  "#D3D3D3", // Silver Grey
  "#E6B0AA", // Soft Peach
  "#C39BD3", // Lilac Purple
  "#B0C4DE", // Pale Blue
  "#ECCF4B", // Butter Yellow
  "#CFD8DC"  // Light Slate Grey
]


const getCardData = (len:number) => {
  return colors.slice(0, len)
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const route=useRouter()
  const [visible,setVisible]=useState(true)
  const len=route.query.len?Number(route.query.len):10
  const card = getCardData(len)
  const cardIndex=useRef(0)
  useEffect(()=>{
    const scrollHeight=container.current?.scrollHeight||0
    container.current?.scrollTo({left:0,top:scrollHeight,behavior:"smooth"})
  })
  return (
    <AnimatePresence onExitComplete={()=>{route.push({pathname:'/test',query:{color:colors[cardIndex.current]}})}}>
       {visible?<motion.div ref={container} className={styles.main} 
        transition={{duration:5}}>
       <div>
          {
            card.map((color, i) => {
              return <Card index={cardIndex} key={`p_${i}`} i={i} color={color} len={len} close={()=>{
                setVisible(false)
              }}/>
            })
          }
        </div>
      </motion.div>:null}
    </AnimatePresence>
  )
}
