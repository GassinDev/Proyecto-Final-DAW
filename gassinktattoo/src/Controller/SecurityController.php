<?php

namespace App\Controller;

use App\Entity\Cliente;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    #[Route(path: '/comprobadorAutorizado', name: 'comprobadorAutorizado')]
    public function comprobadorAutorizado(AuthorizationCheckerInterface $authorizationChecker): Response
    {
        //COMPROBAR SI EL USUARIO ESTA AUTENTICADO
        $isAuthenticated = $authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY');

        //RETORNAMOS TRUE O FALSE
        return new Response($isAuthenticated ? 'true' : 'false');
    }

    #[Route(path: '/comprobarVerificado', name: 'comprobarVerificado')]
    public function comprobadorVerificado(Security $security): Response
    {
        // OBTENER EL CLIENTE AUTENTICADO 
        $cliente = $security->getUser();

        // COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE
        if ($cliente instanceof Cliente) {
            $verificado = $cliente->isVerified();
        } else {
            $verificado = false;
        }

        // DEVOLVEMOS EL RESULTADO COMO UNA CADENA
        return new Response($verificado ? 'true' : 'false');
    }

    #[Route(path: '/comprobarWorker', name: 'comprobarWorker')]
    public function comprobarWorker(Security $security): Response
    {
        // OBTENER EL CLIENTE AUTENTICADO 
        $cliente = $security->getUser();

        // COMPROBAMOS QUE $CLIENTE ES UNA INSTANCIA DE CLIENTE
        if ($cliente instanceof Cliente) {
            $roles = $cliente->getRoles();
            
            $rolesArray = ['roles' => $roles];

            return $this->json($rolesArray);
        } 

        return new Response();
    }

    #[Route(path: '/access-denied', name: 'access-denied')]
    public function accessDenied(): Response
    {
        return $this->render('/security/accessDenied.html.twig');
    }
}
