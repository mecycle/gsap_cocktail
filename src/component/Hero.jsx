import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
    const videoRef = useRef(null);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const heroSplit = new SplitText(".title", { type: 'chars, words'});
            const paragraphSplit = new SplitText(".subtitle", { type: 'lines'});
            heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

            gsap.from(heroSplit.chars, {
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06,
            });

            gsap.from(paragraphSplit.lines, {
                opacity: 0,
                yPercent: 100,
                duration: 1.8,
                ease: "expo.out",
                stagger: 0.06,
                delay: 1,
            });
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: true,
            }
        })
        .to(".right-leaf", { y: 300 }, 0)
        .to(".left-leaf", { y: -200 }, 0)

        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? '120% top' : 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
                markers: true,
            }
        })
        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration,
            });
        }
        // Uncomment the following code if you want to play/pause the video automatically
        // let hasPlayed = false;
        // const videoTimelineRef = gsap.timeline({
        //     scrollTrigger: {
        //         trigger: "#hero",
        //         // start: startValue,
        //         // end: endValue,
        //         scrub: true,
        //         pin: "video",
        //         markers: true,
        //         onEnter: () => {
        //             if (!hasPlayed) {
        //                 videoRef.current.play();
        //                 hasPlayed = true;
        //             }
        //         },
        //         onEnterBack: () => {
        //             if (!hasPlayed) {
        //                 videoRef.current.play();
        //                 hasPlayed = true;
        //             }
        //         },
        //         onLeave: () => {
        //             videoRef.current.pause();
        //         },
        //         onLeaveBack: () => videoRef.current.pause(),
        //     }
        // });
        // videoTimelineRef
        // .fromTo(videoRef.current, {
        //     // currentTime: 0,
        //     opacity: 0.5,
        // }, {
        //     // currentTime: 10,
        //     ease: "none",
        //     opacity: 1,
        //     scale: 1
        // }, 0);

    },[]);

    return (
        <>
            <section id="hero" className="noisy">
                <h1 className="title">MOJITO</h1>
                <img
                 src="/images/hero-left-leaf.png"
                 alt="left leaf"
                 className="left-leaf"
                />

                <img
                 src="/images/hero-right-leaf.png"
                 alt="right leaf"
                 className="right-leaf"
                />

                <div className="body">
                    <div className="content">
                        <div className="space-y-5 hidden md:block">
                            <p>Cool. Crisp. Classic</p>
                            <p className="subtitle">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>
                        <div className="view-cocktails">
                            <p className="subtitle">
                                Every cocktail on our menu is a blend of premium ingredients,
                                creative flair, and timeless recipes — designed to delight your
                                senses.
                            </p>
                            <a href="#cocktails">View Cocktail</a>
                        </div>
                    </div>
                </div>
            </section>
            <div className="video absolute inset-0">
                <video 
                 ref={videoRef}
                 src="/videos/output.mp4"
                 muted
                 playsInline
                 preload="auto"
                />
            </div>
        </>
    )
}

export default Hero;