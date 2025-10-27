'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.collections': 'Collections',
    'nav.dresses': 'Dresses',
    'nav.tops': 'Tops',
    'nav.about': 'About',
    
    // Hero Section
    'hero.headline': 'Timeless. Tailored. Yours.',
    'hero.subline': 'Discover luxury womenswear that embodies elegance, confidence, and modern femininity.',
    'hero.shopNow': 'Shop Now',
    'hero.explore': 'Explore Collection',
    
    // Featured Products
    'featured.title': 'Featured Collection',
    'featured.subtitle': 'Handpicked pieces that define modern luxury',
    'featured.viewAll': 'View All Products',
    
    // About Section
    'about.title': 'About the Maison',
    'about.subtitle': 'Where craftsmanship meets contemporary design',
    'about.description': 'At ParlouX, we believe that true luxury lies in the details. Each piece is meticulously crafted to celebrate the modern woman\'s strength, grace, and individuality.',
    'about.learnMore': 'Learn More',
    
    // Essence Collection
    'essence.title': 'AW25 - Nocturnal Grace',
    'essence.subtitle': 'The Essence of the Collection',
    'essence.description': 'A cinematic journey through the depths of evening elegance, where shadows dance with light and every silhouette tells a story of sophisticated allure.',
    'essence.viewCollection': 'View Collection',
    'essence.shopNew': 'Shop New In',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Stories of elegance and confidence',
    
    // Timeline
    'timeline.title': 'Timeline of the Atelier',
    'timeline.subtitle': 'Our journey through time',
    
    // Newsletter
    'newsletter.title': 'Stay Updated',
    'newsletter.subtitle': 'Subscribe to our newsletter for exclusive offers and new arrivals',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe',
    
    // Breadcrumb translations
    'breadcrumb.home': 'Home',
    'breadcrumb.back': 'Back',
    'breadcrumb.search': 'Search',
    'breadcrumb.products': 'Products',
    'breadcrumb.collections': 'Collections',
    'breadcrumb.about': 'About',
    'breadcrumb.contact': 'Contact',
    'breadcrumb.account': 'Account',
    'breadcrumb.login': 'Login',
    'breadcrumb.register': 'Register',
    'breadcrumb.checkout': 'Checkout',
    'breadcrumb.cart': 'Cart',
    'breadcrumb.wishlist': 'Wishlist',
    'breadcrumb.orders': 'Orders',
    'breadcrumb.profile': 'Profile',
    'breadcrumb.settings': 'Settings',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDescription': 'Add some beautiful pieces to get started',
    'cart.startShopping': 'Start Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.total': 'Total',
    'cart.tax': 'Tax',
    'cart.shipping': 'Shipping',
    'cart.checkout': 'Checkout',
    'cart.continueShopping': 'Continue Shopping',
    'cart.remove': 'Remove',
    'cart.update': 'Update',
    'cart.quantity': 'Quantity',
    'cart.item': 'item',
    'cart.items': 'items',
    'cart.clearCart': 'Clear Cart',
    
    // Wishlist
    'wishlist.title': 'Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDescription': 'Save your favorite pieces for later',
    'wishlist.startShopping': 'Start Shopping',
    'wishlist.addToCart': 'Add to Cart',
    'wishlist.addedToCart': '✓ Added to Cart!',
    'wishlist.removeFromWishlist': 'Remove from Wishlist',
    'wishlist.clearWishlist': 'Clear Wishlist',
    'wishlist.continueShopping': 'Continue Shopping',
    'wishlist.item': 'item',
    'wishlist.items': 'items',
    'wishlist.save': 'Save',
    'wishlist.saved': 'Saved',

    // Search
    'search.placeholder': 'Search for products, collections...',
    'search.suggestions': 'Suggestions',
    'search.recentSearches': 'Recent Searches',
    'search.popularSearches': 'Popular Searches',
    'search.quickLinks': 'Quick Links',
    'search.allCollections': 'All Collections',
    'search.allProducts': 'All Products',
    'search.searching': 'Searching...',
    'search.searchFor': 'Search for',
    'search.resultsFor': 'Results for',
    'search.searchResults': 'Search Results',
    'search.resultsFound': 'results found',
    'search.noResults': 'No results found',
    'search.noResultsDescription': 'Try adjusting your search terms or browse our collections',
    'search.clearSearch': 'Clear Search',
    'search.browseCollections': 'Browse Collections',
    'search.filters': 'Filters',
    'search.clearAll': 'Clear All',
    'search.category': 'Category',
    'search.priceRange': 'Price Range',
    'search.size': 'Size',
    'search.color': 'Color',
    'search.sortBy': 'Sort by',
    'search.relevance': 'Relevance',
    'search.priceLowToHigh': 'Price: Low to High',
    'search.priceHighToLow': 'Price: High to Low',
    'search.newest': 'Newest',
    'search.popularity': 'Popularity',
    
    // Footer
    'footer.brand': 'ParlouX',
    'footer.description': 'Luxury womenswear that embodies elegance, confidence, and modern femininity.',
    'footer.quickLinks': 'Quick Links',
    'footer.customerCare': 'Customer Care',
    'footer.copyright': '© 2024 ParlouX. All rights reserved.',
    
    // Modals
    'modal.search.title': 'Search',
    'modal.search.placeholder': 'Search collections...',
    'modal.search.comingSoon': 'Search functionality coming soon...',
    'modal.wishlist.title': 'Wishlist',
    'modal.wishlist.empty': 'Your wishlist is empty. Start adding items you love!',
    'modal.cart.title': 'Shopping Cart',
    'modal.cart.empty': 'Your cart is empty. Start shopping to add items!',
    'modal.account.title': 'Account',
    'modal.account.signIn': 'Sign In',
    'modal.account.createAccount': 'Create Account',
    'modal.account.profile': 'My Profile',
    'modal.account.orders': 'Order History',
    
    // Account Page
    'account.welcome': 'Welcome',
    'account.manageAccount': 'Manage your account information and preferences',
    'account.personalInfo': 'Personal Information',
    'account.firstName': 'First Name',
    'account.lastName': 'Last Name',
    'account.email': 'Email',
    'account.phone': 'Phone',
    'account.memberSince': 'Member Since',
    'account.editProfile': 'Edit Profile',
    'account.quickActions': 'Quick Actions',
    'account.viewOrders': 'View Order History',
    'account.viewWishlist': 'View Wishlist',
    'account.manageAddresses': 'Manage Addresses',
    'account.logout': 'Logout',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.subtitle': 'Complete your order securely',
    'checkout.shipping': 'Shipping',
    'checkout.billing': 'Billing',
    'checkout.payment': 'Payment',
    'checkout.review': 'Review',
    'checkout.shippingInfo': 'Shipping Information',
    'checkout.billingInfo': 'Billing Information',
    'checkout.paymentInfo': 'Payment Information',
    'checkout.reviewOrder': 'Review Your Order',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.company': 'Company (Optional)',
    'checkout.address': 'Address',
    'checkout.apartment': 'Apartment, suite, etc. (Optional)',
    'checkout.city': 'City',
    'checkout.state': 'District (Optional)',
    'checkout.zip': 'ZIP/Postal Code',
    'checkout.phone': 'Phone Number',
    'checkout.sameAsShipping': 'Same as shipping address',
    'checkout.saveBilling': 'Save billing address for future orders',
    'checkout.cardholderName': 'Cardholder Name',
    'checkout.cardNumber': 'Card Number',
    'checkout.expiryDate': 'Expiry Date',
    'checkout.cvv': 'CVV',
    'checkout.acceptTerms': 'I agree to the Terms and Conditions and Privacy Policy',
    'checkout.placeOrder': 'Place Order',
    'checkout.previous': 'Previous',
    'checkout.next': 'Next',
    'checkout.orderSummary': 'Order Summary',
    'checkout.subtotal': 'Subtotal',
    'checkout.tax': 'Tax',
    'checkout.total': 'Total',
    'checkout.secure': 'Secure',
    'checkout.ssl': 'SSL',
    'checkout.required': 'required',
    
    // Order Success
    'orderSuccess.title': 'Order Confirmed!',
    'orderSuccess.thankYou': 'Thank you for your purchase',
    'orderSuccess.orderConfirmed': 'has been confirmed and is being processed',
    'orderSuccess.orderSummary': 'Order Summary',
    'orderSuccess.shippingInfo': 'Shipping Information',
    'orderSuccess.shippingAddress': 'Shipping Address',
    'orderSuccess.estimatedDelivery': 'Estimated Delivery',
    'orderSuccess.orderStatus': 'Order Status',
    'orderSuccess.processing': 'Processing',
    'orderSuccess.shipped': 'Shipped',
    'orderSuccess.delivered': 'Delivered',
    'orderSuccess.whatsNext': "What's Next?",
    'orderSuccess.confirmationEmail': 'You\'ll receive a confirmation email with your order details and tracking information',
    'orderSuccess.processingTime': 'Your order will be processed and prepared for shipment within 1-2 business days',
    'orderSuccess.trackingInfo': 'Once shipped, you\'ll receive tracking information to monitor your package',
    'orderSuccess.viewOrderHistory': 'View Order History',
    'orderSuccess.continueShopping': 'Continue Shopping',
    'account.notFound': 'Account Not Found',
    'account.goToLogin': 'Go to Login',
    
    // Common
    'common.loading': 'Loading...',
  },
  el: {
    // Navigation
    'nav.collections': 'Συλλογές',
    'nav.dresses': 'Φορέματα',
    'nav.tops': 'Μπλούζες',
    'nav.about': 'Σχετικά',
    
    // Hero Section
    'hero.headline': 'Αιώνια. Ταιριαστά. Δικά σας.',
    'hero.subline': 'Ανακαλύψτε γυναικεία ρούχα πολυτελείας που ενσαρκώνουν κομψότητα, αυτοπεποίθηση και σύγχρονη θηλυκότητα.',
    'hero.shopNow': 'Αγοράστε Τώρα',
    'hero.explore': 'Εξερευνήστε τη Συλλογή',
    
    // Featured Products
    'featured.title': 'Προτεινόμενη Συλλογή',
    'featured.subtitle': 'Επιλεγμένα κομμάτια που ορίζουν τη σύγχρονη πολυτέλεια',
    'featured.viewAll': 'Δείτε Όλα τα Προϊόντα',
    
    // About Section
    'about.title': 'Σχετικά με το Maison',
    'about.subtitle': 'Όπου η τεχνική συναντά το σύγχρονο σχέδιο',
    'about.description': 'Στο ParlouX, πιστεύουμε ότι η αληθινή πολυτέλεια βρίσκεται στις λεπτομέρειες. Κάθε κομμάτι είναι προσεκτικά κατασκευασμένο για να γιορτάζει τη δύναμη, την κομψότητα και την ατομικότητα της σύγχρονης γυναίκας.',
    'about.learnMore': 'Μάθετε Περισσότερα',
    
    // Essence Collection
    'essence.title': 'AW25 - Νυχτερινή Χάρη',
    'essence.subtitle': 'Η Ουσία της Συλλογής',
    'essence.description': 'Μια κινηματογραφική διαδρομή μέσα από τα βάθη της βραδινής κομψότητας, όπου οι σκιές χορεύουν με το φως και κάθε σιλουέτα λέει μια ιστορία εκλεπτυσμένης γοητείας.',
    'essence.viewCollection': 'Δείτε τη Συλλογή',
    'essence.shopNew': 'Αγοράστε Νέες Άφίξεις',
    
    // Testimonials
    'testimonials.title': 'Τι Λένε οι Πελάτες μας',
    'testimonials.subtitle': 'Ιστορίες κομψότητας και αυτοπεποίθησης',
    
    // Timeline
    'timeline.title': 'Χρονολόγιο του Atelier',
    'timeline.subtitle': 'Το ταξίδι μας μέσα στον χρόνο',
    
    // Newsletter
    'newsletter.title': 'Μείνετε Ενημερωμένοι',
    'newsletter.subtitle': 'Εγγραφείτε στο newsletter μας για αποκλειστικές προσφορές και νέες αφίξεις',
    'newsletter.placeholder': 'Εισάγετε το email σας',
    'newsletter.subscribe': 'Εγγραφή',
    
    // Breadcrumb translations
    'breadcrumb.home': 'Αρχική',
    'breadcrumb.back': 'Πίσω',
    'breadcrumb.search': 'Αναζήτηση',
    'breadcrumb.products': 'Προϊόντα',
    'breadcrumb.collections': 'Συλλογές',
    'breadcrumb.about': 'Σχετικά',
    'breadcrumb.contact': 'Επικοινωνία',
    'breadcrumb.account': 'Λογαριασμός',
    'breadcrumb.login': 'Σύνδεση',
    'breadcrumb.register': 'Εγγραφή',
    'breadcrumb.checkout': 'Αγορά',
    'breadcrumb.cart': 'Καλάθι',
    'breadcrumb.wishlist': 'Λίστα Επιθυμιών',
    'breadcrumb.orders': 'Παραγγελίες',
    'breadcrumb.profile': 'Προφίλ',
    'breadcrumb.settings': 'Ρυθμίσεις',
    
    // Cart
    'cart.title': 'Καλάθι Αγορών',
    'cart.empty': 'Το καλάθι σας είναι άδειο',
    'cart.emptyDescription': 'Προσθέστε μερικά όμορφα κομμάτια για να ξεκινήσετε',
    'cart.startShopping': 'Ξεκινήστε Αγορές',
    'cart.subtotal': 'Υποσύνολο',
    'cart.total': 'Σύνολο',
    'cart.tax': 'Φόρος',
    'cart.shipping': 'Αποστολή',
    'cart.checkout': 'Ολοκλήρωση Αγοράς',
    'cart.continueShopping': 'Συνέχεια Αγορών',
    'cart.remove': 'Αφαίρεση',
    'cart.update': 'Ενημέρωση',
    'cart.quantity': 'Ποσότητα',
    'cart.item': 'προϊόν',
    'cart.items': 'προϊόντα',
    'cart.clearCart': 'Άδειασμα Καλαθιού',
    
    // Wishlist
    'wishlist.title': 'Λίστα Επιθυμιών',
    'wishlist.empty': 'Η λίστα επιθυμιών σας είναι άδεια',
    'wishlist.emptyDescription': 'Αποθηκεύστε τα αγαπημένα σας κομμάτια για αργότερα',
    'wishlist.startShopping': 'Ξεκινήστε Αγορές',
    'wishlist.addToCart': 'Προσθήκη στο Καλάθι',
    'wishlist.addedToCart': '✓ Προστέθηκε στο Καλάθι!',
    'wishlist.removeFromWishlist': 'Αφαίρεση από τη Λίστα',
    'wishlist.clearWishlist': 'Άδειασμα Λίστας',
    'wishlist.continueShopping': 'Συνέχεια Αγορών',
    'wishlist.item': 'προϊόν',
    'wishlist.items': 'προϊόντα',
    'wishlist.save': 'Αποθήκευση',
    'wishlist.saved': 'Αποθηκεύτηκε',

    // Search
    'search.placeholder': 'Αναζήτηση προϊόντων, συλλογών...',
    'search.suggestions': 'Προτάσεις',
    'search.recentSearches': 'Πρόσφατες Αναζητήσεις',
    'search.popularSearches': 'Δημοφιλείς Αναζητήσεις',
    'search.quickLinks': 'Γρήγοροι Σύνδεσμοι',
    'search.allCollections': 'Όλες οι Συλλογές',
    'search.allProducts': 'Όλα τα Προϊόντα',
    'search.searching': 'Αναζήτηση...',
    'search.searchFor': 'Αναζήτηση για',
    'search.resultsFor': 'Αποτελέσματα για',
    'search.searchResults': 'Αποτελέσματα Αναζήτησης',
    'search.resultsFound': 'αποτελέσματα βρέθηκαν',
    'search.noResults': 'Δεν βρέθηκαν αποτελέσματα',
    'search.noResultsDescription': 'Δοκιμάστε να προσαρμόσετε τους όρους αναζήτησης ή περιηγηθείτε στις συλλογές μας',
    'search.clearSearch': 'Εκκαθάριση Αναζήτησης',
    'search.browseCollections': 'Περιήγηση Συλλογών',
    'search.filters': 'Φίλτρα',
    'search.clearAll': 'Εκκαθάριση Όλων',
    'search.category': 'Κατηγορία',
    'search.priceRange': 'Εύρος Τιμών',
    'search.size': 'Μέγεθος',
    'search.color': 'Χρώμα',
    'search.sortBy': 'Ταξινόμηση κατά',
    'search.relevance': 'Σχετικότητα',
    'search.priceLowToHigh': 'Τιμή: Χαμηλή προς Υψηλή',
    'search.priceHighToLow': 'Τιμή: Υψηλή προς Χαμηλή',
    'search.newest': 'Νεότερα',
    'search.popularity': 'Δημοτικότητα',
    
    // Footer
    'footer.brand': 'ParlouX',
    'footer.description': 'Γυναικεία ρούχα πολυτελείας που ενσαρκώνουν κομψότητα, αυτοπεποίθηση και σύγχρονη θηλυκότητα.',
    'footer.quickLinks': 'Γρήγοροι Σύνδεσμοι',
    'footer.customerCare': 'Εξυπηρέτηση Πελατών',
    'footer.copyright': '© 2024 ParlouX. Όλα τα δικαιώματα διατηρούνται.',
    
    // Modals
    'modal.search.title': 'Αναζήτηση',
    'modal.search.placeholder': 'Αναζήτηση συλλογών...',
    'modal.search.comingSoon': 'Η λειτουργία αναζήτησης θα είναι σύντομα διαθέσιμη...',
    'modal.wishlist.title': 'Λίστα Επιθυμιών',
    'modal.wishlist.empty': 'Η λίστα επιθυμιών σας είναι άδεια. Αρχίστε να προσθέτετε αγαπημένα κομμάτια!',
    'modal.cart.title': 'Καλάθι Αγορών',
    'modal.cart.empty': 'Το καλάθι σας είναι άδειο. Αρχίστε να αγοράζετε για να προσθέσετε προϊόντα!',
    'modal.account.title': 'Λογαριασμός',
    'modal.account.signIn': 'Σύνδεση',
    'modal.account.createAccount': 'Δημιουργία Λογαριασμού',
    'modal.account.profile': 'Το Προφίλ μου',
    'modal.account.orders': 'Ιστορικό Παραγγελιών',
    
    // Account Page
    'account.welcome': 'Καλώς ήρθατε',
    'account.manageAccount': 'Διαχειριστείτε τις πληροφορίες και τις προτιμήσεις του λογαριασμού σας',
    'account.personalInfo': 'Προσωπικές Πληροφορίες',
    'account.firstName': 'Όνομα',
    'account.lastName': 'Επώνυμο',
    'account.email': 'Email',
    'account.phone': 'Τηλέφωνο',
    'account.memberSince': 'Μέλος από',
    'account.editProfile': 'Επεξεργασία Προφίλ',
    'account.quickActions': 'Γρήγορες Ενέργειες',
    'account.viewOrders': 'Προβολή Ιστορικού Παραγγελιών',
    'account.viewWishlist': 'Προβολή Λίστας Επιθυμιών',
    'account.manageAddresses': 'Διαχείριση Διευθύνσεων',
    'account.logout': 'Αποσύνδεση',
    'account.notFound': 'Λογαριασμός δεν βρέθηκε',
    'account.goToLogin': 'Πηγαίνετε στη Σύνδεση',
    
    // Checkout
    'checkout.title': 'Ολοκλήρωση Παραγγελίας',
    'checkout.subtitle': 'Ολοκληρώστε την παραγγελία σας με ασφάλεια',
    'checkout.shipping': 'Αποστολή',
    'checkout.billing': 'Χρέωση',
    'checkout.payment': 'Πληρωμή',
    'checkout.review': 'Επιθεώρηση',
    'checkout.shippingInfo': 'Πληροφορίες Αποστολής',
    'checkout.billingInfo': 'Πληροφορίες Χρέωσης',
    'checkout.paymentInfo': 'Πληροφορίες Πληρωμής',
    'checkout.reviewOrder': 'Επιθεώρηση Παραγγελίας',
    'checkout.firstName': 'Όνομα',
    'checkout.lastName': 'Επώνυμο',
    'checkout.company': 'Εταιρεία (Προαιρετικό)',
    'checkout.address': 'Διεύθυνση',
    'checkout.apartment': 'Διαμέρισμα, σουίτα, κ.λπ. (Προαιρετικό)',
    'checkout.city': 'Πόλη',
    'checkout.state': 'Επαρχία (Προαιρετικό)',
    'checkout.zip': 'Ταχυδρομικός Κώδικας',
    'checkout.phone': 'Αριθμός Τηλεφώνου',
    'checkout.sameAsShipping': 'Ίδια με τη διεύθυνση αποστολής',
    'checkout.saveBilling': 'Αποθήκευση διεύθυνσης χρέωσης για μελλοντικές παραγγελίες',
    'checkout.cardholderName': 'Όνομα κατόχου κάρτας',
    'checkout.cardNumber': 'Αριθμός Κάρτας',
    'checkout.expiryDate': 'Ημερομηνία Λήξης',
    'checkout.cvv': 'CVV',
    'checkout.acceptTerms': 'Συμφωνώ με τους Όρους και Προϋποθέσεις και την Πολιτική Απορρήτου',
    'checkout.placeOrder': 'Ολοκλήρωση Παραγγελίας',
    'checkout.previous': 'Προηγούμενο',
    'checkout.next': 'Επόμενο',
    'checkout.orderSummary': 'Περίληψη Παραγγελίας',
    'checkout.subtotal': 'Υποσύνολο',
    'checkout.tax': 'Φόρος',
    'checkout.total': 'Σύνολο',
    'checkout.secure': 'Ασφαλές',
    'checkout.ssl': 'SSL',
    'checkout.required': 'απαιτείται',
    
    // Order Success
    'orderSuccess.title': 'Η Παραγγελία Επιβεβαιώθηκε!',
    'orderSuccess.thankYou': 'Ευχαριστούμε για την αγορά σας',
    'orderSuccess.orderConfirmed': 'έχει επιβεβαιωθεί και βρίσκεται σε επεξεργασία',
    'orderSuccess.orderSummary': 'Περίληψη Παραγγελίας',
    'orderSuccess.shippingInfo': 'Πληροφορίες Αποστολής',
    'orderSuccess.shippingAddress': 'Διεύθυνση Αποστολής',
    'orderSuccess.estimatedDelivery': 'Εκτιμώμενη Παράδοση',
    'orderSuccess.orderStatus': 'Κατάσταση Παραγγελίας',
    'orderSuccess.processing': 'Επεξεργασία',
    'orderSuccess.shipped': 'Απεστάλη',
    'orderSuccess.delivered': 'Παραδόθηκε',
    'orderSuccess.whatsNext': 'Τι Ακολουθεί;',
    'orderSuccess.confirmationEmail': 'Θα λάβετε email επιβεβαίωσης με τις λεπτομέρειες της παραγγελίας και τις πληροφορίες παρακολούθησης',
    'orderSuccess.processingTime': 'Η παραγγελία σας θα επεξεργαστεί και θα προετοιμαστεί για αποστολή εντός 1-2 εργάσιμων ημερών',
    'orderSuccess.trackingInfo': 'Μόλις αποσταλεί, θα λάβετε πληροφορίες παρακολούθησης για να παρακολουθείτε το δέμα σας',
    'orderSuccess.viewOrderHistory': 'Προβολή Ιστορικού Παραγγελιών',
    'orderSuccess.continueShopping': 'Συνέχεια Αγορών',
    
    // Common
    'common.loading': 'Φόρτωση...',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations];
    return (langTranslations as any)?.[key] || key;
  };

  // Always provide the context, but with default values during SSR
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
