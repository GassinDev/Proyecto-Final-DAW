<?php

namespace App\Controller\Apis;

use App\Repository\TatuajeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiTatuajesController extends AbstractController
{
    #[Route('/api/tatuajes', name: 'api_tatuajes')]
    public function getTatuajes(TatuajeRepository $tatuajeRepository): Response
    {
        $tatuajes = $tatuajeRepository->findAll();
        return $this->json($tatuajes);
    }
}
