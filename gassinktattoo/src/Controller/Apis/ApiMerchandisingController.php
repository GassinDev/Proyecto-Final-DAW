<?php

namespace App\Controller\Apis;

use App\Repository\MerchandisingRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ApiMerchandisingController extends AbstractController
{
    #[Route('/api/merchandising', name: 'api_merchandising')]
    public function getMerchandising(MerchandisingRepository $merchandisingRepository): Response
    {
        $merchandising = $merchandisingRepository->findAll();

        return $this->json($merchandising);
    }

    #[Route('/api/merchandising/tipos', name: 'merchandising_tipos')]
    public function getMerchandisingTipos(MerchandisingRepository $merchandisingRepository): JsonResponse
    {
        // Obtener solo los tipos de merchandising
        $merchandising = $merchandisingRepository->findAll();

        // Crear un array con los tipos
        $tiposArray = [];
        foreach ($merchandising as $tipos) {

            $tipo = $tipos->getType(); 

            if (!in_array($tipo, $tiposArray)) {
                $tiposArray[] = $tipo;
            }
        }

        return new JsonResponse($tiposArray);
    }
}
