import { Client, Account } from "appwrite";
import Swal from 'sweetalert2'


const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // API Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // project ID

// Initialize Appwrite account service
const account = new Account(client);

const emailInput = document.getElementById()

async function handleLogin(){
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Attempt to create a session with the provided email and password
        const result = await account.createEmailSession(email, password);
        console.log(result);
        await Swal.fire({
        position: "center",
        icon: "success",
        title: "Bienvenidos!",
        showConfirmButton: false,
        timer: 1500
        });
        window.location.href = 'dashboard.html'

    } catch (error) {
        // If there's an error, log it and potentially inform the user
        console.error('Login failed:', error);
        await Swal.fire({
        position: "center",
        icon: "error",
        title: "Contraseña y/o Usuario Incorrecto",
        showConfirmButton: false,
        timer: 1500
        });
    }
}

