<?php

namespace App\Controller;

use App\Repository\ClienteRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class WorkerController extends AbstractController
{
    #[Route(path: '/workers', name: 'workers')]
    public function workers(ClienteRepository $clienteRepository): Response
    {

        $workers = $clienteRepository->findBy(['isWorker' => true]);


        return $this->json($workers);
    }

    #[Route(path: '/workers/clienteUsernames', name: 'clienteUsernames')]
    public function getClienteUsernames(ClienteRepository $clienteRepository): JsonResponse
    {
        $clientes = $clienteRepository->findBy(['isWorker' => false]);

        $usernames = [];
        foreach ($clientes as $cliente) {
            $usernames[] = $cliente->getUsername(); 
        }

        return new JsonResponse(['usernames' => $usernames]);
    }
}
