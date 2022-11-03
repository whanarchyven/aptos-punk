// Animations

export const animate={
    animateSvg : {
        hidden: {
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            pathLength: 1,
            fill: "rgba(255, 255, 255, 1)"
        }
    },

    animateFadeInRight : {
        visible: {opacity: 1, x: 0},
        hidden: {opacity: 0, x: -100}
    },
    animateFadeInLeft:{
        visible: {opacity: 1, x: 0},
        hidden: {opacity: 0, x: 100}
    },
    animateFadeInDown:{
        visible: {opacity: 1, y: 0},
        hidden: {opacity: 0, y: -100}
    },
    animateZoomIn:{
        visible: {opacity: 1, scale: 1},
        hidden: {opacity: 0, scale: 0}
    },

    animateZoomOut:{
        visible: {opacity: 1, scale: 1},
        hidden: {opacity: 0, scale: 2}
    },



    transitionSecond : {duration: 1.4, ease: 'backInOut'},

}





