<?php

namespace App\Controller;

use App\Entity\Cliente;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class PerfilController extends AbstractController
{
    #[Route(path: '/perfilDatos', name: 'perfilDatos')]
    public function perfilDatos(Security $security): Response
    {
        // Obtener el cliente autenticado
        $cliente = $security->getUser();

        // Comprobar que $cliente es una instancia de Cliente
        if ($cliente instanceof Cliente) {
            // Obtener todos los datos del cliente
            $datosCliente = [
                'username' => $cliente->getUsername(),
                'email' => $cliente->getEmail(),
                'image' => $cliente->getImagePerfil()
            ];
        }

            return $this->json($datosCliente);
    }
}
