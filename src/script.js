$(function () {$('.navbar-btn').on('click', function () {
    $('.navbar-inner').toggleClass('in');
});
});


$(function () {
    $("#menumob").load("menumob.html");
});

$(function () {
    $("#menu").load("menudesk.html");
});


$(function () {
    interval();
    // get children
    var imgs = $(".items").children();
    // get amount of children minus one
    var band = $(imgs).size() - 1;
    var cont = 0;
    // set "class current" a first selector with class .dots
    $(".dots").eq(0).addClass("current");

    $(".arrows").on("click", "img", function () {
        $(".dots").removeClass("current");
        $(imgs).hide();
        if ($(this).index() == 1) {
            cont = cont < band ? (cont += 1) : 0;
        } else {
            cont = cont > 0 ? (cont -= 1) : band;
        }
        $(".dots").eq(cont).addClass("current");
        $(imgs).eq(cont).fadeIn();
    });


    var slide;
    function interval() {
        slide = setInterval(function () {
            $(".dots").removeClass("current");
            $(imgs[cont]).fadeOut(1500);
            cont = cont < band ? (cont += 1) : 0;
            $(".dots").eq(cont).addClass("current");
            $(imgs).eq(cont).fadeIn(3000);
        }, 7000);
    }
    $(".items").hover(
        function () {
            // stop slide
            clearInterval(slide);
        },
        function () {
            // reset slide
            interval();
        }
    );
});

$(function () {
    interval();
    // get children
    var imgs = $(".items-b").children();
    // get amount of children minus one
    var band = $(imgs).size() - 1;
    var cont = 0;
    // set "class current" a first selector with class .dots
    $(".dots").eq(0).addClass("current");

    $(".arrows").on("click", "img", function () {
        $(".dots").removeClass("current");
        $(imgs).hide();
        if ($(this).index() == 1) {
            cont = cont < band ? (cont += 1) : 0;
        } else {
            cont = cont > 0 ? (cont -= 1) : band;
        }
        $(".dots").eq(cont).addClass("current");
        $(imgs).eq(cont).fadeIn();
    });

    var slide;
    function interval() {
        slide = setInterval(function () {
            $(".dots").removeClass("current");
            $(imgs[cont]).fadeOut(1500);
            cont = cont < band ? (cont += 1) : 0;
            $(".dots").eq(cont).addClass("current");
            $(imgs).eq(cont).fadeIn(3000);
        }, 7000);
    }
    $(".items-b").hover(
        function () {
            // stop slide
            clearInterval(slide);
        },
        function () {
            // reset slide
            interval();
        }
    );
});

$(function () {
    interval();
    // get children
    var imgs = $(".items-c").children();
    // get amount of children minus one
    var band = $(imgs).size() - 1;
    var cont = 0;
    // set "class current" a first selector with class .dots
    $(".dots-m").eq(0).addClass("current");

    $(".arrows-m").on("click", "img", function () {
        $(".dots-m").removeClass("current");
        $(imgs).hide();
        if ($(this).index() == 1) {
            cont = cont < band ? (cont += 1) : 0;
        } else {
            cont = cont > 0 ? (cont -= 1) : band;
        }
        $(".dots-m").eq(cont).addClass("current");
        $(imgs).eq(cont).fadeIn();
    });



    var slide;
    function interval() {
        slide = setInterval(function () {
            $(".dots-m").removeClass("current");
            $(imgs[cont]).fadeOut(1500);
            cont = cont < band ? (cont += 1) : 0;
            $(".dots-m").eq(cont).addClass("current");
            $(imgs).eq(cont).fadeIn(3000);
        }, 7000);
    }
    $(".items-c").hover(
        function () {
            // stop slide
            clearInterval(slide);
        },
        function () {
            // reset slide
            interval();
        }
    );
});

$(function () {
    interval();
    // get children
    var imgs = $(".items-d").children();
    // get amount of children minus one
    var band = $(imgs).size() - 1;
    var cont = 0;
    // set "class current" a first selector with class .dots
    $(".dots-m").eq(0).addClass("current");

    $(".arrows-m").on("click", "img", function () {
        $(".dots-m").removeClass("current");
        $(imgs).hide();
        if ($(this).index() == 1) {
            cont = cont < band ? (cont += 1) : 0;
        } else {
            cont = cont > 0 ? (cont -= 1) : band;
        }
        $(".dots-m").eq(cont).addClass("current");
        $(imgs).eq(cont).fadeIn();
    });


    var slide;
    function interval() {
        slide = setInterval(function () {
            $(".dots-m").removeClass("current");
            $(imgs[cont]).fadeOut(1500);
            cont = cont < band ? (cont += 1) : 0;
            $(".dots-m").eq(cont).addClass("current");
            $(imgs).eq(cont).fadeIn(3000);
        }, 7000);
    }
    $(".items-d").hover(
        function () {
            // stop slide
            clearInterval(slide);
        },
        function () {
            // reset slide
            interval();
        }
    );
});

