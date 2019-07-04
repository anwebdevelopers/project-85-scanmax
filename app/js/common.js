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
                641: {
                    dots: false,
                    nav: true,
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

    } ( jQuery ) );

    /*******************************************************/
    //TIMILINE SLIDER
    /*******************************************************/

    ( function( $ ) {

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

    } ( jQuery ) );

    /*******************************************************/
    //TIMILINE GALLERY
    /*******************************************************/

    // $( '[ data-fancybox="timeline-gallery" ]' ).fancybox( {
    //     thumbs : {
    //         // autoStart : true
    //     }
    // } );

    /*******************************************************/
    //PUBLICATIONS MOBILE SLIDER
    /*******************************************************/

    ( function( $ ) {

        $( window ).on( 'load resize', function( event ) {

            if ( window.innerWidth <= 769 ) {

                $( '.publications__section' ).each( function () {

                    $( this ).addClass( 'owl-carousel' ).owlCarousel( {
                        loop: true,
                        // items: 1,
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

                $( '.publications__section' ).each( function () {
                    $( this ).trigger( 'destroy.owl.carousel' ).removeClass( 'owl-carousel' );
                } );
            }
        } );

    } ( jQuery ) );


    /*******************************************************/
    //PARTHNERS SLIDER
    /*******************************************************/

    ( function( $ ) {

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

    } ( jQuery ) );


    /*******************************************************/
    //TABS
    /*******************************************************/
    ( function( $ ) {

        $( '.tabs' ).attr( 'active', '' ).each( function () {

            $( this ).prepend( '<div class="tabs__buttons"></div>' );

            $( this ).find( '.tabs__button' ).appendTo( $( this ).find( '.tabs__buttons' ) ).first().attr( 'active', '' );

            $( this ).find( '.tabs__section' ).not( ':first' ).hide();

            $( this ).find( '.tabs__buttons' ).on('click', '.tabs__button:not( [ active ] )', function() {

                $( this ).attr( 'active', '' ).siblings().removeAttr( 'active' ).closest( '.tabs' ).find( '.tabs__section' ).slideUp(300).eq( $( this ).index() ).slideDown( 300 );

            } );

        } );

    } ( jQuery ) );


    /*******************************************************/
    //PUBLICATIONS TABS
    /*******************************************************/

    ( function( $ ) {

        $( '.publications__box[ active ]' ).each( function () {

            $( this ).prepend( '<div class="publications__head"></div>' );

            $( this ).find( '.publications__head' ).append( $( this ).prev( '.publications__title' ) ).append( $( this ).find( '.tabs__buttons' ) );

        } );

    } ( jQuery ) );

} );
