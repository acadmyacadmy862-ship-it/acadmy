// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js";

// إعدادات فايربيس
const firebaseConfig = {
    apiKey: "AIzaSyD1zVLdD8AkYt0Kgm7da4QsP1_GrPdqANA",
    authDomain: "acadmy-4891f.firebaseapp.com",
    projectId: "acadmy-4891f",
    storageBucket: "acadmy-4891f.firebasestorage.app",
    messagingSenderId: "849627080128",
    appId: "1:849627080128:web:6e11c509dfd812c3f65425",
    measurementId: "G-Q6XNTCDGKR",
    databaseURL: "https://acadmy-4891f-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// دالة اختيار المادة من الكروت
window.selectCourse = function(courseName) {
    const courseSelect = document.getElementById('courseSelect');
    if (courseSelect) {
        courseSelect.value = courseName;
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
};

// دالة إرسال الحجز
window.handleBooking = function(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('courseSelect').value;
    const grade = document.getElementById('grade').value;

    if (!fullName || !phone || !course || !grade) {
        alert("برجاء إكمال جميع البيانات المطلوبة!");
        return;
    }

    const bookingsRef = ref(db, 'bookings');
    push(bookingsRef, {
        fullName: fullName,
        phone: phone,
        course: course,
        grade: grade,
        timestamp: new Date().toISOString()
    }).then(() => {
        // التحويل المباشر لصفحة إنستاباي بعد نجاح الحفظ
        window.location.href = 'https://ipn.eg/S/eyad1aa/instapay/10RhHc';
    }).catch((error) => {
        console.error("Firebase Error:", error);
        alert("حدث خطأ أثناء حفظ البيانات، تأكد من اتصال الإنترنت.");
    });
};