import React from 'react';
import { openingHours, socials } from '../../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

const Contact = () => {
    useGSAP(() => {
        const titleSplit = new SplitText("#contact h2", { type: "words" });
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top center",
            },
            ease: "power1.inOut",
        });
        timeline
        .from(titleSplit.words, { opacity: 0, yPercent: 100, stagger: 0.02 })
        .from("#contact h3, #contact p", { opacity: 0, yPercent: 100, stagger: 0.02 })
        .from("#contact img", { opacity: 0, scale: 0.8, duration: 0.5 })
        .to('#f-right-leaf', { y:-50, duration: 0.5, ease: "power1.inOut" })
        .to('#f-left-leaf', { y:50, duration: 0.5, ease: "power1.inOut" }, '<')

    })

  return (
    <footer id='contact'>
        <img src='/images/footer-right-leaf.png' alt='leaf-right' id='f-right-leaf'></img>
        <img src='/images/footer-left-leaf.png' alt='leaf-left' id='f-left-leaf'></img>

        <div className='content'>
            <h2>Where to Find Us</h2>
            <div>
                <h3>Visit Our Bar</h3>
                <p>9999, William St, Melbourne, Vic 9999</p>
            </div>
            <div>
                <h3>Contact Us</h3>
                <p>(99) 123 456 789</p>
                <p>Email: micto666@gmail.com</p>
            </div>
            <div>
                <h3>Open Every Day</h3>
                {openingHours.map((time, index) => (
                    <p key={time.day}>
                        {time.day}: {time.time}
                    </p>
                ))}
            </div>
            <div>
                <h3>Socials</h3>
                <div className='flex-center gap-5'>
                    {
                        socials.map((social, index) => (
                            <a 
                                key={social.name} 
                                href={social.url} 
                                target='_blank' 
                                rel='noopener noreferrer'
                                aria-label={social.name}>
                                <img src={social.icon} />
                            </a>
                        ))
                    }
                </div>
            </div>
        </div>
    </footer>
  );
}   
export default Contact;