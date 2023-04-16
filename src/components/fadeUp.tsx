import { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface FadeUpProps {
	delay?: number;
	children: ReactNode;
}

const FadeUp: React.FC<FadeUpProps> = ({ children, delay = 0 }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [key, setKey] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				threshold: 0.5,
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => {
			observer.disconnect();
		};
	}, []);

	useEffect(() => {
		if (isVisible) {
			setKey((prevKey) => prevKey + 1);
		}
	}, [isVisible]);

	return (
		<motion.div
			key={key}
			ref={ref}
			initial={{ x: 60, opacity: 0 }}
			animate={isVisible ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
			transition={{ delay, duration: 1.5, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
};

export default FadeUp;
