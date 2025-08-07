// slider
    var swiper = new Swiper(".slide-swp", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        loop: true,  
    });


// product_swiper 
    var swiper = new Swiper(".pro_sale", {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,  
        autoplay: {
            delay: 3000,
        },
        navigation:{
            nextEl : ".swiper-button-next",
            prevEl : ".swiper-button-prev",
        },
        breakpoints:{
            1200: {
                slidesPerView: 5,
            },
            1000: {
                slidesPerView: 4,
            },

            850: {
                slidesPerView: 3,
            },

            750: {
                slidesPerView: 3,
            },

            650: {
                slidesPerView: 3,
            },

            550: {
                slidesPerView: 2,
            },

            400: {
                slidesPerView: 2,
            },

            350: {
                slidesPerView: 2,
            },

            300: {
                slidesPerView: 2,
            },
        },
    });
