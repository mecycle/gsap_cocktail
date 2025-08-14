import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { allCocktails } from '../../constants';

const Menu = () => {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalCocktails = allCocktails.length;
    const animatingRef = useRef(false);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power1.inOut' } });

        tl.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0)
            .fromTo(".cocktail img", { opacity: 0, xPercent: -100 }, {
                opacity: 1, duration: 0.5, xPercent: 0, ease: "power1.inOut"
            }, 0)

            .fromTo(".details h2", { opacity: 0, yPercent: 100 }, {
                opacity: 1, duration: 0.5, yPercent: 0, ease: "power1.inOut"
            }, 0)
            .fromTo(".details p", { opacity: 0, yPercent: 100 }, {
                opacity: 1, duration: 0.5, yPercent: 0, ease: "power1.inOut"
            }, 0)
            .fromTo(".arrows span", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power1.inOut" }, 0)
        return () => tl.kill();
    }, [currentIndex]);

    const goToSlide = (index) => {
        if (animatingRef.current) return;
        animatingRef.current = true;
        const newIndex = (index + totalCocktails) % totalCocktails;

        const tl = gsap.timeline({
            defaults: { ease: 'power1.inOut' },
            onComplete: () => {
                setCurrentIndex(newIndex);
                animatingRef.current = false;
            },
        });
        tl.to(".cocktail img", { opacity: 0, duration: 0.5, xPercent: 200, ease: "power1.out" }, 0)
            .to("#title", { opacity: 0, duration: 0.8 }, 0)
            .to(".details h2", { opacity: 0, yPercent: 200, duration: 0.5, ease: "power1.inOut" }, 0)
            .to(".details p", { opacity: 0, yPercent: 200, duration: 0.5, ease: "power1.inOut" }, 0)
            .to(".arrows span", { opacity: 0, duration: 0.3, ease: "power1.inOut" }, "-=0.2")
    }

    const getCocktailAt = (indexOffset) => {
        return allCocktails[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);

    return (
        <section id='menu' aria-labelledby='menu-heading'>
            <img src='/images/slider-left-leaf.png' alt='left-leaf' id='m-left-leaf' />
            <img src='/images/slider-right-leaf.png' alt='right-leaf' id='m-right-leaf' />

            <h2 id='menu-heading' className='sr-only'>
                Cocktail Menu
            </h2>
            <nav className='cocktail-tabs' aria-label="Cocktail Navigation">
                {allCocktails.map((cocktail, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <button key={cocktail.name} className={`
                            ${isActive
                                ? 'text-white border-white'
                                : 'text-white/50 border-white/50'
                            }`} onClick={() => goToSlide(index)}>
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>
            <div className='content'>
                <div className='arrows'>
                    <button className='text-left' onClick={() => goToSlide(currentIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img src='/images/right-arrow.png' alt='right-arrow' aria-hidden='true' />
                    </button>

                    <button className='text-left' onClick={() => goToSlide(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src='/images/left-arrow.png' alt='left-arrow' aria-hidden='true' />
                    </button>
                </div>
                <div className='cocktail'>
                    <img src={currentCocktail.image} className="object-contain" />
                </div>
                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for:</p>
                        <p id='title'>{currentCocktail.name}</p>
                    </div>
                    <div className='details'>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Menu;