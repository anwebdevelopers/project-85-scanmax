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

    $( '.about__box' ).addClass( 'owl-carousel' ).owlCarousel( {
        loop: true,
        items: 3,
        nav: true,
        navText: '',
        dots: false,
        autoplayTimeout: 5000,
        autoplay: true,
        smartSpeed: 1200,
        // autoHeight: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true,
                nav: false,
            },
            481: {
                items: 2
            },
            769: {
                items: 3
            },
            // 1025: {
            //     items: 3
            // },
            // 993: {
            //     items: 5
            // }
        },
        // onInitialize: function( event ) {
        //     $( event.target ).find( '.about__item' ).each( function() {
        //         $( this ).attr( 'data-item-counter', $( this ).index() + 1 )
        //     } );
        // },
        onInitialized: function( event ) {
            $( event.target ).prepend( '<div class="about__head"></div>').find( '.about__head' ).prepend( $( event.target ).prev( '.about__title' ) ).append( $( event.target ).find( '.owl-nav' ) );
            // $( event.target ).prepend( $( '.about__title' ) ).prepend( '<div class="about__title"></div>');
            // $( event.target ).prepend( '<div class="about__title"><div class="about__counter-current">' + $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) + '</div><div class="about__counter-amount"> / ' + ( $( event.target ).find( '.owl-item:not( .cloned )' ).length ) + '</div></div>' );
        },
        // onTranslated: function( event ) {
        //     $( event.target ).find( '.about__counter-current' ).text( $( event.target ).find( '.owl-item.active [ data-item-counter ]' ).attr( 'data-item-counter' ) )
        // }
    } );

} );
