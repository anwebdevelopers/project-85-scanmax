'use strict';

document.addEventListener( 'DOMContentLoaded', function( event ) {



    ( function( $ ) {

        /*******************************************************/
        //MENU
        /*******************************************************/

        const $elemNav = $( '.header__menu' ),
           $buttonNav = $( '.header__menu-button' );

        $buttonNav.on( 'click', function( event ) {

            event.stopPropagation();

            if ( $( this )[ 0 ].hasAttribute( 'active' ) ) {
                $buttonNav.removeAttr( 'active' );
                $elemNav.removeAttr( 'active' );
            } else {
                $buttonNav.attr( 'active', '' );
                $elemNav.attr( 'active', '' );
            }
        } );

        $( document ).on( 'click', function( event ) {
            if ( ! event.target.closest( '.header__menu' ) ) {
                $buttonNav.removeAttr( 'active' );
                $elemNav.removeAttr( 'active' );
            }
        } );


        /*******************************************************/
        //MOBILE MENU ACCORDION
        /*******************************************************/
        ( function() {

            let windowWidth = window.innerWidth;

            $( window ).on( 'load resize', function( event ) {

                const newWindowWidth = window.innerWidth;

                if ( ( event.type === 'load' ) || ( ( event.type === 'resize' ) && ( windowWidth !== newWindowWidth ) ) ) {

                    windowWidth = newWindowWidth;

                    if ( window.innerWidth <= 640 ) {

                        $( '.mobile-menu-accordion' ).each( function() {
                            const $this = $( this );
                            ( $this.hasClass('active') || $this.find('.active').length ) ? $this.attr('active', '').children('.mobile-menu-accordion__box').show() : $this.removeAttr( 'active' ).children('.mobile-menu-accordion__box').hide();
                        } );

                    } else {

                        $( '.mobile-menu-accordion' ).each( function() {
                            $( this ).removeAttr( 'active' ).children('.mobile-menu-accordion__box').show();
                        } );
                    }
                }
            } );
        } () );


        $( '.mobile-menu-accordion' ).on( 'click', '.mobile-menu-accordion__title', function( event ) {

            if ( window.innerWidth <= 640 ) {

                const $this = $( this );

                if ( ! $this.closest( '.mobile-menu-accordion' )[ 0 ].hasAttribute( 'active' ) ) {

                    event.preventDefault();

                    $this.closest( '.mobile-menu-accordion' ).siblings().removeAttr( 'active' ).children( '.mobile-menu-accordion__box' ).slideUp( 300 ).end().end().closest( '.header__submenu-column' ).siblings().children( '.mobile-menu-accordion' ).removeAttr( 'active' ).children( '.mobile-menu-accordion__box' ).slideUp( 300 );

                    $this.closest( '.mobile-menu-accordion' ).attr( 'active', '' ).children( '.mobile-menu-accordion__box' ).slideDown( 300 );
                }
            }
        } );


        /*******************************************************/
        //HEADER SLIDER
        /*******************************************************/

        $( '.header__slider-box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            items: 1,
            nav: false,
            autoplayTimeout: 10000,
            autoplay: true,
            smartSpeed: 1200,
            onInitialize: function( event ) {
                $( event.target ).find( '.header__slider-item' ).each( function () {
                    $( this ).attr( 'data-index', $( this ).index() + 1 );
                } );
            },
            onInitialized: function( event ) {
                $( event.target ).find( '.owl-item:not(.cloned) .header__slider-img img' ).each( function() {
                    $( event.target ).find( '.owl-dot' ).eq( $( this ).index( '.owl-item:not( .cloned ) .header__slider-img img' )).html( '<img src="' + $( this ).attr( 'src' ) + '">' );
                });
            }
        } );

        /*******************************************************/
        //ABOUT VIDEO SLIDER
        /*******************************************************/

        $( '.video__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            nav: true,
            navText: '',
            dots: false,
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1200,
            autoWidth: true,
            responsiveClass: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    dots: true,
                    nav: false,
                },
                641: {
                    dots: false,
                    nav: true,
                },
            },

            onInitialized: function( event ) {

                $( event.target ).prepend( '<div class="video__head"></div>').find( '.video__head' ).prepend( $( event.target ).prev( '.video__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            },
        } );


        /*******************************************************/
        //CATALOG MOBILE SLIDER
        /*******************************************************/

        $( window ).on( 'load resize', function( event ) {

            if ( window.innerWidth <= 641 ) {

                $( '.catalog.catalog_style_home .catalog__box' ).addClass( 'owl-carousel' ).owlCarousel( {
                    loop: true,
                    items: 1,
                    nav: false,
                    dots: true,
                    autoplayTimeout: 5000,
                    autoplay: true,
                    smartSpeed: 1200,
                    autoWidth: true,
                    autoplayHoverPause: true,
                } );

            } else {

                $( '.catalog.catalog_style_home .catalog__box' ).trigger( 'destroy.owl.carousel' ).removeClass( 'owl-carousel' );
            }

        } );


        /*******************************************************/
        //TIMILINE SLIDER
        /*******************************************************/

        $( '.timeline__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: false,
            nav: false,
            dots: false,
            autoplay: false,
            smartSpeed: 800,
            autoWidth: true,
            URLhashListener: false,

            onInitialized: function( event ) {

                $( event.target ).prepend( '<div class="timeline__head"><div class="timeline__dots"></div></div>').find( '.timeline__head' ).prepend( $('.timeline__title' ) );

                $( event.target ).find( '.owl-item:not(.cloned) .timeline__item[ data-slide-id ]' ).each( function() {
                    $( event.target ).find( '.timeline__dots' ).append( '<button data-dot-id="' + $( this ).attr( 'data-slide-id' ) + '" class="timeline__dot">' + $( this ).attr( 'data-slide-id' ) + '</button>' );
                } );

                $( event.target ).find( '.timeline__dot[ data-dot-id="' + $( event.target ).find( '.owl-item.active [ data-slide-id ]' ).attr( 'data-slide-id' ) + '" ]' ).addClass( 'active' ).siblings( '.timeline__dot' ).removeClass( 'active' );

                $( event.target ).find( '.timeline__dots' ).on( 'click', '.timeline__dot:not( .active )', function () {

                    $( event.target ).trigger( 'to.owl.carousel', [ $( event.target ).find( '[ data-slide-id="' + $( this ).attr( 'data-dot-id' ) + '" ]' ).closest( '.owl-item' ).index(), 600 ] )
                } )

            },

            onTranslated: function( event ) {

                $( event.target ).find( '.timeline__dot[ data-dot-id="' + $( event.target ).find( '.owl-item.active [ data-slide-id ]' ).attr( 'data-slide-id' ) + '" ]' ).addClass( 'active' ).siblings( '.timeline__dot' ).removeClass( 'active' );
            }


        } ).on( 'mousewheel', '.owl-stage', function ( event ) {

            ( event.originalEvent.deltaY > 0 ) ? $( '.timeline__box' ).trigger( 'next.owl' ) : $( '.timeline__box' ).trigger( 'prev.owl' );

            event.preventDefault();
        } );


        /*******************************************************/
        //PUBLICATIONS MOBILE SLIDER
        /*******************************************************/

        $( window ).on( 'load resize', function( event ) {

            if ( window.innerWidth <= 769 ) {

                $( '.publications__box.publications__box_style_slider' ).each( function () {

                    $( this ).addClass( 'owl-carousel' ).owlCarousel( {
                        loop: true,
                        nav: false,
                        dots: true,
                        autoplayTimeout: 5000,
                        autoplay: true,
                        smartSpeed: 1200,
                        autoWidth: true,
                        autoplayHoverPause: true,
                    } );

                } );

            } else {

                $( '.publications__box.publications__box_style_slider' ).each( function () {
                    $( this ).trigger( 'destroy.owl.carousel' ).removeClass( 'owl-carousel' );
                } );
            }
        } );


        /*******************************************************/
        //PARTHNERS SLIDER
        /*******************************************************/

        $( '.parthners__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            nav: true,
            navText: '',
            dots: false,
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1200,
            autoWidth: true,
            responsiveClass: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    dots: true,
                    nav: false,
                },
                641: {
                    dots: false,
                    nav: true,
                },
            },

            onInitialized: function( event ) {
                $( event.target ).prepend( '<div class="parthners__head"></div>').find( '.parthners__head' ).prepend( $( event.target ).prev( '.parthners__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            },
        } );


        /*******************************************************/
        //TABS
        /*******************************************************/

        $( '.tabs' ).attr( 'active', '' ).each( function () {

            $( this ).prepend( '<div class="tabs__buttons"></div>' );

            $( this ).find( '.tabs__button' ).appendTo( $( this ).find( '.tabs__buttons' ) ).first().attr( 'active', '' );

            $( this ).find( '.tabs__section' ).not( ':first' ).hide();

            $( this ).find( '.tabs__buttons' ).on('click', '.tabs__button:not( [ active ] )', function() {

                $( this ).attr( 'active', '' ).siblings().removeAttr( 'active' ).closest( '.tabs' ).find( '.tabs__section' ).slideUp(300).eq( $( this ).index() ).slideDown( 300 );

            } );

        } );

        /*******************************************************/
        //PUBLICATIONS TABS
        /*******************************************************/

        $( '.publications__tabs[ active ]' ).each( function () {

            $( this ).prepend( '<div class="publications__head"></div>' );

            $( this ).find( '.publications__head' ).append( $( this ).prev( '.publications__title' ) ).append( $( this ).find( '.tabs__buttons' ) );

        } );


        /*******************************************************/
        //MOBILE FILTER
        /*******************************************************/

        $( '.page__filter-button' ).on( 'click', function ( event ) {

            event.preventDefault();

            $( this )[ 0 ].hasAttribute( 'active' ) ? $( this ).removeAttr( 'active' ) : $( this ).attr( 'active', '' )

        } );


        /*******************************************************/
        //CARD SLIDER
        /*******************************************************/

        $( '.card__img' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            items: 1,
            nav: true,
            dots: false,
            navText: '',
            autoplayTimeout: 5000,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 600,
            onInitialize: function( event ) {

                $( event.target ).after( '<div class="card__dots"></div>' );

                $( event.target ).find( '.card__img-item' ).each( function() {

                    $( event.target ).next( '.card__dots' ).append( $( '<div class="card__dots-item"></div>' ).append( $( this ).find( 'img' ).clone() ) );
                } );

                $( event.target ).next( '.card__dots' ).addClass( 'owl-carousel' ).owlCarousel( {
                    loop: true,
                    items: 6,
                    nav: true,
                    dots: false,
                    navText: '',
                    smartSpeed: 600,

                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 4,
                            nav: false,
                        },
                        360: {
                            items: 5,
                            nav: false,
                        },
                        481: {
                            items: 6,
                            nav: false,
                        },
                        641: {
                            items: 7,
                            nav: false,
                        },
                        769: {
                            items: 4,

                        },
                        1025: {
                            items: 5
                        },
                        1281: {
                            items: 6
                        },
                    },
                    onInitialize: function( event ) {

                        $( event.target ).on( 'click', '.owl-item', function() {
                            $( event.target ).trigger( 'to.owl.carousel', $( this ).closest( '.owl-item' ).index() - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) );
                        } );
                    },
                    onTranslate: function( event ) {

                        if ( ! $( event.target ).hasClass( 'listener-translate-event' ) ) {

                            $( event.target ).prev( '.card__img' ).addClass( 'listener-translate-event' ).trigger( 'to.owl.carousel', event.item.index + (event.item.count - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) ) )
                        } else {
                            $( event.target ).removeClass( 'listener-translate-event' );
                        }
                    },
                } );
            },
            onTranslate: function( event ) {

                if ( ! $( event.target ).hasClass( 'listener-translate-event' ) ) {

                    $( event.target ).next( '.card__dots' ).addClass( 'listener-translate-event' ).trigger( 'to.owl.carousel', event.item.index + (event.item.count - ( $( event.target ).find( '.owl-item.cloned' ).length / 2 ) ) );
                } else {
                    $( event.target ).removeClass( 'listener-translate-event' );
                }
            },
        } );


        /*******************************************************/
        //CARD GALLERY SLIDER
        /*******************************************************/

        $( '.gallery__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            nav: true,
            navText: '',
            dots: false,
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1200,
            autoWidth: true,
            responsiveClass: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    dots: true,
                    nav: false,
                },
                641: {
                    dots: false,
                    nav: true,
                },
            },

            onInitialized: function( event ) {
                $( event.target ).prepend( '<div class="gallery__head"></div>').find( '.gallery__head' ).prepend( $( event.target ).prev( '.gallery__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            },
        } );


        /*******************************************************/
        //CATALOG MOBILE SLIDER
        /*******************************************************/

        $( window ).on( 'load resize', function( event ) {

            if ( window.innerWidth <= 641 ) {

                $( '.equipment__box' ).addClass( 'owl-carousel' ).owlCarousel( {
                    loop: true,
                    items: 2,
                    nav: false,
                    dots: true,
                    autoplayTimeout: 5000,
                    autoplay: true,
                    smartSpeed: 1200,
                    autoplayHoverPause: true,
                } );

            } else {

                $( '.equipment__box' ).trigger( 'destroy.owl.carousel' ).removeClass( 'owl-carousel' );
            }

        } );


        /*******************************************************/
        //ABOUT VIDEO SLIDER
        /*******************************************************/

        $( '.additional__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: true,
            nav: true,
            navText: '',
            dots: false,
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1200,
            autoWidth: true,
            responsiveClass: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    dots: true,
                    nav: false,
                },
                641: {
                    dots: false,
                    nav: true,
                },
            },

            onInitialized: function( event ) {

                $( event.target ).prepend( '<div class="additional__head"></div>').find( '.additional__head' ).prepend( $( event.target ).prev( '.additional__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            },
        } );

        /*******************************************************/
        //RECOMMENDED GOODS SLIDER
        /*******************************************************/

        $( '.recommend .goods__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            items: 4,
            loop: true,
            nav: true,
            navText: '',
            dots: false,
            autoplayTimeout: 5000,
            autoplay: true,
            smartSpeed: 1200,
            responsiveClass: true,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    dots: true,
                    nav: false,
                },
                641: {
                    dots: false,
                    nav: true,
                    items: 2,
                },
                1025: {
                    items: 3,
                },
                1281: {
                    items: 4,
                },
            },

            onInitialized: function( event ) {

                $( event.target ).prepend( '<div class="recommend__head"></div>').find( '.recommend__head' ).prepend( $( event.target ).prev( '.recommend__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            },
        } );

        /*******************************************************/
        //CARD ANCHOR SCROLL
        /*******************************************************/
        ( function() {

            const $scroll = $('.scroll');

            if ( $scroll.length ) {

                let startPos = $scroll.offset().top;

                $( window ).scroll( function() {

                    if ( $( window ).scrollTop() >= startPos ) {

                        if ( ! $scroll[ 0 ].hasAttribute( 'active' ) ) {
                            const navHeight = $scroll.height();
                            $scroll.css( { 'min-height': navHeight + 'px' } ).attr( 'active', '' );
                        }
                    } else {

                        $scroll.removeAttr( 'active' ).removeAttr( 'style' );
                    }
                } );

                $( window ).resize( function() {

                    startPos = $scroll.offset().top;
                } );

                $( '.scroll__nav a' ).mPageScroll2id();
            }

        } () );


        /*******************************************************/
        //MOBILE PAGE NAV ACCORDION
        /*******************************************************/
        ( function() {

            let windowWidth = window.innerWidth;

            $( window ).on( 'load resize', function( event ) {

                const newWindowWidth = window.innerWidth;

                if ( ( event.type === 'load' ) || ( ( event.type === 'resize' ) && ( windowWidth !== newWindowWidth ) ) ) {

                    windowWidth = newWindowWidth;

                    if ( window.innerWidth <= 1024 ) {

                        $( '.mobile-nav-accordion' ).each( function() {
                            const $this = $( this );
                            ( $this.hasClass('active') || $this.find('.active').length ) ? $this.attr('active', '').children('.mobile-nav-accordion__box').show() : $this.removeAttr( 'active' ).children('.mobile-nav-accordion__box').hide();
                        } );

                    } else {

                        $( '.mobile-nav-accordion' ).each( function() {
                            $( this ).removeAttr( 'active' ).children('.mobile-nav-accordion__box').show();
                        } );
                    }
                }
            } );
        } () );



        $( '.mobile-nav-accordion' ).on( 'click', '.mobile-nav-accordion__title', function( event ) {

            if ( window.innerWidth <= 1024 ) {

                const $this = $( this );

                if ( ! $this.closest( '.mobile-nav-accordion' )[ 0 ].hasAttribute( 'active' ) ) {

                    event.preventDefault();

                    $this.closest( '.mobile-nav-accordion' ).siblings().removeAttr( 'active' ).children( '.mobile-nav-accordion__box' ).slideUp( 300 ).end().end().closest( '.header__submenu-column' ).siblings().children( '.mobile-nav-accordion' ).removeAttr( 'active' ).children( '.mobile-nav-accordion__box' ).slideUp( 300 );

                    $this.closest( '.mobile-nav-accordion' ).attr( 'active', '' ).children( '.mobile-nav-accordion__box' ).slideDown( 300 );
                }
            }
        } );

        $( '[ data-current-category ]' ).on( 'click', function ( event ) {

            if (  $( event.target )[ 0 ].hasAttribute( 'data-current-category' ) ) {
                event.target.toggleAttribute( 'active');
                $( this ).find( '> ul' ).slideToggle( 300 );
            }
        } );

        ( function() {

            let windowWidth = window.innerWidth;

            $( window ).on( 'resize', function( ) {

                const newWindowWidth = window.innerWidth;

                if ( windowWidth !== newWindowWidth ) {

                    windowWidth = newWindowWidth;

                    if ( window.innerWidth >= 1024 ) {

                        $( '[ data-current-category ]' ).find( 'ul' ).removeAttr( 'style' ).end().removeAttr( 'active' );
                    }
                }
            } );

        } () );



        //*********************************************************//
        //YANDEX MAP
        //*********************************************************//
        ( function() {

            const mapElem = document.querySelector('#map');

            if ( mapElem ) {

                const script = document.createElement('script');

                script.src = '//api-maps.yandex.ru/2.1/?lang=ru_RU';

                document.getElementsByTagName('head')[0].appendChild(script);

                script.onload = function () {

                    ymaps.ready(function () {

                        const myMap = new ymaps.Map('map', {
                            center: [55.615807, 37.626187],
                            zoom: 16,
                            controls: [],
                            behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch']
                        }, {
                            searchControlProvider: 'yandex#search'
                        });

                        //Элементы управления
                        myMap.controls.add('zoomControl', {
                            size: 'small',
                            position: {
                                top: 'auto',
                                right: 10,
                                bottom: 50
                            }
                        });

                        myMap.geoObjects.add(new ymaps.Placemark(
                            [55.615807, 37.626187],
                            {
                                hintContent: '117545, г Москва, ул. Дорожная, д.8, корп.1, комната К1-313, этаж 3',
                                balloonContent: '117545, г Москва, ул. Дорожная, д.8, корп.1, комната К1-313, этаж 3',
                            },
                            {
                                // iconLayout: 'islands#redIcon',
                                preset: 'islands#redGlyphIcon'
                                // iconImageHref: 'img/icon-mark.svg',
                                // iconImageSize: [ 53, 62 ],
                                // iconImageOffset: [- 26, -62 ],
                            }
                        ));


                        const manageDrag = function () {
                            window.innerWidth <= 1024 ? myMap.behaviors.disable('drag') : myMap.behaviors.enable('drag')
                        };
                        window.onload = manageDrag
                        window.onresize = manageDrag

                        typeof ResizeObserver === 'object' && new ResizeObserver(function (entries) {
                            myMap.container.fitToViewport()
                        }).observe(mapElem);

                        myMap.container.fitToViewport();

                    });

                }
            }

        } () );

        //*********************************************************//
        //SCROLL ANIMATIONS
        //*********************************************************//

        ( function() {

            if ( window.innerWidth >= 1025 ) {

                $.Scrollax();
            }

        } () );


        //*********************************************************//
        //MOUSE OVER ANIMATIONS
        //*********************************************************//

        ( function() {

            if ( window.innerWidth >= 1025 ) {

                $( '[ data-tilt-animation ]' ).tilt( {
                    maxTilt: 7,
                    transition: true,
                    speed: 1000,
                } );
            }

        } () );


    } ( jQuery ) );

} );
