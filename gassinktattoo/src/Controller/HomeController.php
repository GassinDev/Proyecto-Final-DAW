<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
    #[Route('/home', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('pages/inicio.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }

    #[Route('/productos', name: 'productos')]
    public function productos(): Response
    {
        return $this->render('pages/productos.html.twig');
    }

    #[Route('/merchandising', name: 'merchandising')]
    public function merchandising(): Response
    {
        return $this->render('pages/merchandising.html.twig');
    }

    #[Route('/carrito', name: 'carrito')]
    public function carrito(): Response
    {
        return $this->render('pages/carrito.html.twig');
    }

    #[Route('/tatuajes', name: 'tatuajes')]
    public function tatuajes(): Response
    {
        return $this->render('pages/tatuajes.html.twig');
    }

    #[Route('/perfil', name: 'perfil')]
    public function perfil(): Response
    {
        return $this->render('pages/perfil.html.twig');
    }
}
