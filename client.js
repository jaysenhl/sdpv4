import { Client, Query, Databases, ID } from "appwrite";
import Swal from "sweetalert2";
import { formattedDate, showLoadingPopup, hideLoadingPopup } from "./userInterface";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);


// comprobar que exista el elemento en el html
document.addEventListener('DOMContentLoaded', (event)=>{
    const createClientBtn = document.getElementById('createClientBtn');
    if (createClientBtn) {
        createClientBtn.addEventListener('click', async () => {

            const nameInput = document.getElementById('nameInput').value.trim();
            const telefono = document.getElementById('telefonoInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();

            // Verificar que los campos no estén vacíos antes de mostrar el loading
            if (nameInput === '' || telefono === '' || email === '') {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "NO PUEDEN HABER CAMPOS EN BLANCO",
                    showConfirmButton: true,
                });
                return; // Detener la ejecución si hay campos en blanco
            }

            showLoadingPopup();

            try {
                // Verificar si el teléfono o el email ya existen
                const verifyPhone = await databases.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    [Query.equal('telefono', telefono)]
                );

                const verifyEmail = await databases.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    [Query.equal('email', email)]
                );

                if (verifyPhone.documents.length > 0 || verifyEmail.documents.length > 0) {
                    // Teléfono o email ya existen, mostrar alerta
                    hideLoadingPopup();
                    await Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "CLIENTE CON ESE NÚMERO Y/O EMAIL YA EXISTE!",
                        showConfirmButton: true,
                    });
                } else {
                    // Ni el teléfono ni el email existen, crear el cliente
                    const clientCreated = await databases.createDocument(
                        import.meta.env.VITE_APPWRITE_DATABASE_ID,
                        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                        ID.unique(),
                        {
                            "nombre": nameInput,
                            "telefono": telefono,
                            "email": email,
                            "cliente_desde": formattedDate
                        }
                    );
                    hideLoadingPopup();
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "CLIENTE CREADO EN SISTEMA!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    document.getElementById('nameInput').value = '';
                    document.getElementById('telefonoInput').value = '';
                    document.getElementById('emailInput').value = '';
                }
            } catch (error) {
                // Error durante la verificación o creación del cliente
                hideLoadingPopup();
                console.error(error);
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "ERROR AL PROCESAR LA SOLICITUD",
                    showConfirmButton: true,
                });
            }
        });
    }

    // SEARCH CLIENT LOGIC AND CHANGE USER INTERFACE
    const searchClientBtn = document.getElementById('searchClientBtn')
    if(searchClientBtn){
        searchClientBtn.addEventListener('click',async ()=>{
            const telefono = document.getElementById('telefonoInput').value 
            try {
                const promise = await databases.listDocuments(
                    import.meta.env.VITE_APPWRITE_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                    [
                        Query.equal('telefono', telefono)
                    ]
                );
            
                if (promise.documents.length > 0) {
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "CLIENTE EXISTE!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(promise.documents[0]);
                    document.getElementById('telefonoInput').value = '';
                } else {
                    await Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "CLIENTE NO EXISTE!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                await Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "ERROR AL BUSCAR CLIENTE!",
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(error);
            }
        })
    }
})


