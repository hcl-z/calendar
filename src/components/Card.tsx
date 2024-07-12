'use client'
import Image from 'next/image';

import styles from '../styles/index.module.scss';
import { useTransform, motion, useScroll, TargetAndTransition, useIsPresent } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

const CARDHEIGHT = 160
// 
// const WINDOWHEIGHT = window.innerHeight

interface Props {
    i: number;
    color: string;
    len: number;
    close: () => void
    index: React.MutableRefObject<number>;
}
const Card = ({ i, color, len,close,index }: Props) => {
    const isPresent=useIsPresent()
    const container = useRef<HTMLDivElement>(null);
    //   const height = window.innerHeight
    const [exitCard, setExitCard] = useState(false)
    const router = useRouter()

    const topRef=useRef(0)
    const handleClick = () => {
        setExitCard(true)
        index.current=i
        const {y}=container.current?.getBoundingClientRect()||{}
        topRef.current=y||0
        close()
    }

    const handleUnmount=()=>{
        router.push({ pathname: '/test' ,query:{color}})
    }

    const anime:TargetAndTransition = exitCard ? {
        // position: Posi,
        y:-topRef.current
    } : {
        opacity: 0,
        rotateX:0
    }

    return (
        <motion.div
            key={i}
            onClick={handleClick}
            ref={container}
            className={styles.cardContainer} 
            style={{ top: i * 20 }} 
            exit={anime} 
            // initial={{ top:0 }}
            // animate= {{ top: i * 20 }}
            transition={{
                type: 'spring',
                duration: .8,
                bounce: 0
            }}>
            <motion.div
                exit={{rotateX:0}}
                style={{ backgroundColor: color,rotateX: i === len - 1 ? 0 : -9  }}
                className={styles.card}
            >
                <span>Card{i + 1}</span>
            </motion.div>
        </motion.div>
    )
}

export default Card