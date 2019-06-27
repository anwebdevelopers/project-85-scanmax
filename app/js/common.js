'use strict';

document.addEventListener( 'DOMContentLoaded', function( event ) {

    let windowWidth = window.innerWidth;

    /*******************************************************/
    //MENU
    /*******************************************************/
    ( function( $ ) {

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

    } ( jQuery ) );

    /*******************************************************/
    //MOBILE MENU ACCORDION
    /*******************************************************/
    ( function( $ ) {

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
    } ( jQuery ) );

    /*******************************************************/
    //HEADER SLIDER
    /*******************************************************/

    ( function( $ ) {

        $( '.header__slider' ).addClass( 'owl-carousel' ).owlCarousel( {
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

    } ( jQuery ) );

    /*******************************************************/
    //ABOUT VIDEO SLIDER
    /*******************************************************/

    ( function( $ ) {

        $( '.about__box' ).addClass( 'owl-carousel' ).owlCarousel( {
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
            },

            onInitialized: function( event ) {
                $( event.target ).prepend( '<div class="about__head"></div>').find( '.about__head' ).prepend( $( event.target ).prev( '.about__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            },
        } );

    } ( jQuery ) );

    /*******************************************************/
    //CATALOG MOBILE SLIDER
    /*******************************************************/

    ( function( $ ) {

        $( window ).on( 'load resize', function( event ) {

            if ( window.innerWidth <= 480 ) {

                $( '.catalog__box' ).addClass( 'owl-carousel' ).owlCarousel( {
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
                $( '.catalog__box' ).trigger( 'destroy.owl.carousel' ).removeClass( 'owl-carousel' );
            }

        } );

    } ( jQuery ) );

    /*******************************************************/
    //TIMILINE SLIDER
    /*******************************************************/

    /*( function( $ ) {

        $( '.timeline__box' ).addClass( 'owl-carousel' ).owlCarousel( {
            loop: false,
            nav: false,
            navText: '',
            dots: false,
            autoplay: false,
            smartSpeed: 600,
            autoWidth: true,
            URLhashListener: true,

            onInitialized: function( event ) {

                $( event.target ).prepend( '<div class="timeline__head"><div class="timeline__dots"></div></div>').find( '.timeline__head' ).prepend( $('.timeline__title' ) );

                $( event.target ).find( '.owl-item:not(.cloned) .timeline__item[ data-hash ]' ).each( function() {
                    $( event.target ).find( '.timeline__dots' ).append( '<a href="#' + $( this ).attr( 'data-hash' ) + '" class="timeline__dot">' + $( this ).attr( 'data-hash' ) + '</a>' );
                } );
            },
            onTranslated: function( event ) {
                $( event.target ).find( '.timeline__dot[ href="#' + $( event.target ).find( '.owl-item.active [ data-hash ]' ).attr( 'data-hash' ) + '" ]' ).addClass( 'active' ).siblings( '.timeline__dot' ).removeClass( 'active' );

            }

        } )
        // .on( 'mousewheel', '.owl-stage', function ( event ) {
        //     if ( event.deltaY > 0 ) {
        //         $( '.timeline__box' ).trigger( 'next.owl' );
        //     } else {
        //         $( '.timeline__box' ).trigger( 'prev.owl' );
        //     }
        //     event.preventDefault();
        // } );

    } ( jQuery ) );*/

} );
