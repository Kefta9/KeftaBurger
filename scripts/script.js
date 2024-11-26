// Cet événement se déclenche lorsque la page est complètement chargée
document.addEventListener('DOMContentLoaded', function () {

    // Ajouter le code de suivi Google Analytics dans le JS
    (function() {
        var gaScript = document.createElement('script');
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';  // Remplace G-XXXXXXXXXX par l'ID de suivi du client
        gaScript.async = true;
        document.head.appendChild(gaScript);

        gaScript.onload = function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX'); // Remplace G-XXXXXXXXXX par l'ID de suivi du client
        };
    })();

    // Ici, nous sélectionnons tous les onglets (les éléments du menu) qu'on trouve dans la page
    const tabs = document.querySelectorAll('.menu-tabs a.tab');

    // Si on a des onglets dans la page (ça veut dire qu'il y en a au moins un)
    if (tabs.length > 0) {
        // Pour chaque onglet, on lui ajoute une fonction qui s'active quand on clique dessus
        tabs.forEach(tab => {
            tab.addEventListener('click', function(event) {
                event.preventDefault();  // Empêche l'action normale du lien (on ne veut pas recharger la page)

                // On enlève la classe "active" de tous les onglets, ce qui veut dire qu'aucun n'est sélectionné
                tabs.forEach(t => t.classList.remove('active'));

                // Puis on ajoute la classe "active" à l'onglet sur lequel on a cliqué, pour montrer qu'il est sélectionné
                this.classList.add('active');

                // On cache toutes les catégories du menu pour ne pas les voir
                document.querySelectorAll('.menu-category').forEach(category => category.classList.remove('active'));

                // On récupère l'ID de la catégorie qu'on veut montrer
                const targetId = this.getAttribute('href').substring(1);
                // On trouve la catégorie correspondante par son ID
                const targetCategory = document.getElementById(targetId);

                // Si la catégorie existe, on lui ajoute la classe "active" pour la rendre visible
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }

    // Ici, on vérifie si dans l'URL de la page il y a un "hash" (une partie après #), comme "#pizzas"
    const urlHash = window.location.hash.substring(1);

    // Si on a un hash, on essaie de l'utiliser pour initialiser l'onglet actif et la catégorie visible
    if (urlHash) {
        const targetTab = document.querySelector(`.menu-tabs a.tab[href="#${urlHash}"]`);
        const targetCategory = document.getElementById(urlHash);

        if (targetTab && targetCategory) {
            // On enlève la classe "active" de tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            // Puis on ajoute la classe "active" à l'onglet qu'on a trouvé
            targetTab.classList.add('active');

            // On cache toutes les catégories
            document.querySelectorAll('.menu-category').forEach(category => category.classList.remove('active'));
            // Puis on affiche la catégorie correspondant à l'onglet
            targetCategory.classList.add('active');
        }
    }

    // On vérifie si le bouton du menu hamburger (le menu qui se cache sur mobile) existe
    const navToggle = document.querySelector('.navbar-toggler');
    const navMenu = document.getElementById('navbarMenu');
    
    // Si le bouton et le menu existent
    if (navToggle && navMenu) {
        // On ajoute un événement pour fermer le menu si l'on clique en dehors du menu ou du bouton
        document.addEventListener("click", function(event) {
            // Si le menu est ouvert et qu'on clique en dehors
            if (navMenu.classList.contains('show') && !navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navToggle.click();  // Cela simule un clic sur le bouton pour fermer le menu
            }
        });
    }

    // On vérifie si l'élément "ville" (le menu de sélection des villes) existe avant de l'utiliser
    const villeSelect = document.getElementById('ville');
    const infoLivraison = document.getElementById('infoLivraison');

    // Si la sélection de ville et le bloc des infos de livraison existent
    if (villeSelect && infoLivraison) {
        // On ajoute un événement qui se déclenche quand la ville change
        villeSelect.addEventListener('change', function () {
            const ville = villeSelect.value;  // On récupère la ville sélectionnée
            let message = '';  // On commence par ne rien mettre

            // On cache les infos de livraison au départ
            infoLivraison.style.display = 'none';

            // Si la valeur de la ville est vide (l'option "Choix de la ville..." est sélectionnée), on ne fait rien
            if (!ville) {
                return;
            }

            // On vérifie la ville sélectionnée pour afficher les infos correspondantes
            if (ville) {
                switch (ville) {
                    case 'nice':
                        message = '<p><strong>Nice</strong> : Minimum de commande <strong>8,50€</strong></p>';
                        break;
                    case 'trinite':
                        message = '<p><strong>La Trinité</strong> : Minimum de commande <strong>10€</strong></p>';
                        break;
                    case 'saint_laurent':
                        message = '<p><strong>Saint-Laurent-du-Var</strong> : Minimum de commande <strong>15€</strong></p>';
                        break;
                    case 'cagnes':
                        message = '<p><strong>Cagnes-sur-Mer</strong> : Minimum de commande <strong>20€</strong></p>';
                        break;
                }

                // On met à jour l'infoLivraison avec le message correct
                infoLivraison.innerHTML = message;
                // Et on la fait réapparaître en la montrant
                infoLivraison.style.display = 'block';
            }
        });
    }

    // Vérifier si on est sur la page Menu en utilisant l'URL
    if (window.location.pathname.includes("menu")) {
        // Sélectionner l'élément de la flèche
        const scrollToTopBtn = document.getElementById('scrollToTopBtn');
        const nextMenu = document.getElementById('next-menu'); // Sélectionne l'élément "next-menu"

        // Lorsque l'utilisateur fait défiler la page
        window.addEventListener('scroll', function() {
            // Si on a dépassé l'élément "next-menu", on affiche la flèche
            if (window.scrollY > nextMenu.offsetTop) {
                scrollToTopBtn.style.display = 'block'; // Affiche la flèche
            } else {
                // Sinon, on cache la flèche
                scrollToTopBtn.style.display = 'none';
            }
        });

        // Quand on clique sur la flèche, on remonte jusqu'à l'élément "retourfleche"
        scrollToTopBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut du lien
            const retourfleche = document.getElementById('retourfleche'); // Sélectionne l'élément "retourfleche"
            if (retourfleche) {
                retourfleche.scrollIntoView({
                    behavior: 'smooth' // Fait défiler la page en douceur jusqu'à "retourfleche"
                });
            }
        });
    }
});
