document.addEventListener("DOMContentLoaded", () => {
    //Slider
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        navPosition: 'bottom',
        controls: false
    });

    document.querySelector('.slick-prev').addEventListener('click', () => {
        slider.goTo('prev');
    });

    document.querySelector('.slick-next').addEventListener('click', () => {
        slider.goTo('next');
    });

    //Tabs
    const catalogContent = document.querySelectorAll('.catalog__content');
    const tabs = document.querySelectorAll('.catalog__tab');
    tabs.forEach((item, i) => {
        item.addEventListener('click', () => {
            tabs.forEach(tab => {
                tab.classList.remove('catalog__tab_active');
            });
            catalogContent.forEach( catItem => {
                catItem.classList.remove('catalog__content_active');
            });
            item.classList.add('catalog__tab_active');
            catalogContent[i].classList.add('catalog__content_active');
        });
    });

    const detailed = document.querySelectorAll('.catalog-item__link');
    const back = document.querySelectorAll('.catalog-item__back');
    back.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            item.parentElement.classList.remove('catalog-item__list_active');
            detailed[i].parentElement.classList.add('catalog-item__content_active');
        });
    });
    detailed.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            item.parentElement.classList.remove('catalog-item__content_active');
            back[i].parentElement.classList.add('catalog-item__list_active');
        });
    });

    //Modal
    document.querySelectorAll('.modal__close').forEach(item => {
        item.addEventListener('click', () => {
            fadeOut( document.querySelector('.overlay'), 'none');
            fadeOut( document.querySelector('#consultation'), 'none');
            fadeOut( document.querySelector('#order'), 'none');
            fadeOut( document.querySelector('#thanks'), 'none');
            fadeOut( document.querySelector('#error'), 'none');
        });
    });

    document.querySelectorAll('.overlay').forEach((item, i) => {
        item.addEventListener('click', (e) => {
            if (e.target.className == 'overlay') {
                fadeOut( document.querySelector('.overlay'), 'none');
                fadeOut( document.querySelector('#consultation'), 'none');
                fadeOut( document.querySelector('#order'), 'none');
                fadeOut( document.querySelector('#thanks'), 'none');
                fadeOut( document.querySelector('#error'), 'none');
            }
        });
    });

    document.querySelectorAll('[data-modal=consultation]').forEach(item => {
        item.addEventListener('click', () => {
            fadeIn( document.querySelector('.overlay'), 'block');
            fadeIn( document.querySelector('#consultation'), 'block');
        });
    });

    document.querySelectorAll('.button_mini').forEach((item, i) => {
        item.addEventListener('click', (e) => {
            fadeIn( document.querySelector('.overlay'), 'block');
            fadeIn( document.querySelector('#order'), 'block');
            document.querySelector('#order .modal__desc').innerHTML = document.querySelectorAll('.catalog-item__subtitle')[i].innerText;
        });
    });

    // ** FADE OUT FUNCTION **
    function fadeOut(el) {
        if (el.style.display != "none") {
            el.style.opacity = 1;
            (function fade() {
                if ((el.style.opacity -= .05) < 0) {
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            })();
        }
    };

    // ** FADE IN FUNCTION **
    function fadeIn(el, display) {
        if (el.style.display != "block") {
            el.style.opacity = 0;
            el.style.display = display || "block";
            (function fade() {
                let val = parseFloat(el.style.opacity);
                if (!((val += .05) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            })();
        }   
    };

    const animateCSS = (node, animation, prefix = 'animate__') => {
        // We create a Promise and return it
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve(node);
            }

            node.addEventListener('animationend', handleAnimationEnd, {once: true});
        });
    }


    //mask and validation
    document.querySelectorAll('.phone-number').forEach((input) => {
        let keyCode;
        function mask(event) {
            const pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            const matrix = "+7 (___) ___-__-__",
                val = this.value.replace(/\D/g, "");
            let i = 0,
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i);
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            
            if (event.type == "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        // input.addEventListener("keydown", mask, false);

    });

    const inputs = document.querySelectorAll('.feed-form input');
    const submitBtns = document.querySelectorAll('.feed-form .button_submit');
    submitBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(e);
            let perm = true;
            document.querySelectorAll(`#${btn.parentNode.parentNode.id} form input`).forEach(input => {         
                if (input.value.length == 0) {
                    input.classList.add('error');
                    animateCSS(input, 'headShake');
                    
                    input.classList.add('animate__animated', 'animate__headShake');
                    
                    if (input.nextSibling.className != 'error-label' && input.nextSibling.className != 'error-label white') {
                        const label = document.createElement('div');
                        label.classList.add('error-label');
                        if (btn.parentNode.parentNode.id == "main_consultation") {
                            label.classList.add('white');
                        }
                        label.innerHTML = "это поле является обязательным";
                        input.after(label);
                    }
                    perm = false;
                } else {
                    input.classList.remove('error');
                    if (input.nextSibling.className == 'error-label' || input.nextSibling.className == 'error-label white') {
                        input.nextSibling.remove();
                    }
                }
                
            });
            if (perm) {
                let formObj = {};
                for (let key in btn.parentNode.elements) {
                    if (btn.parentNode.elements[key].name && typeof(btn.parentNode.elements[key]) != 'function' && Number.isInteger(+key)) {
                        formObj[btn.parentNode.elements[key].name] = btn.parentNode.elements[key].value;
                    }
                }
                sendForm(formObj)
                .then(() => {
                    fadeOut(document.querySelector('#consultation'), 'none');
                    fadeOut(document.querySelector('#order'), 'none');
                    fadeIn(document.querySelector('#thanks'), 'block');
                })
                .catch((error) => {
                    console.log(`sending error --- ${error}`);
                    fadeOut(document.querySelector('#consultation'), 'none');
                    fadeOut(document.querySelector('#order'), 'none');
                    fadeIn(document.querySelector('#error'), 'block');
                    document.querySelector('#error .modal__desc').innerHTML = `Ошибка - ${error}`;
                })
                .finally(() => {
                    btn.parentNode.reset();
                });
                
                
            }
        });
    });


    //post data
    getResourse = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            body: data
        });

        if (!res.ok) {
            throw new Error(`could not fetch ${url}, status: ${res.status}`);
        }

        return await res;
    }

    const sendForm = (formObj) => {
        return new Promise( (resolve, reject) => {
            let formData = new FormData();
            for ( let k in formObj ) {
                formData.append(k, formObj[k]);
            }
        
            postData("mailer/smart.php", formData)
                .then(data => {
                    console.log(data);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        })
    };


    window.addEventListener('scroll', () => {
        const top = document.documentElement.scrollTop;
        document.querySelectorAll('.feedback-item').forEach((item, i) => {
            if (item.getBoundingClientRect().top < (document.documentElement.clientHeight - 100)) {
                item.style.visibility = 'visible';
                item.classList.add(`animate__animated`, 'animate__fadeInLeft');
            }
        });

        if (top > 1500) {
            fadeIn(document.querySelector('.pageup'), 'block');
        } else {
            fadeOut(document.querySelector('.pageup'), 'none');
        }
    });

});
