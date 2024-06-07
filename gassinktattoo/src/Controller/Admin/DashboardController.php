<?php

namespace App\Controller\Admin;

use App\Entity\Carrito;
use App\Entity\Cita;
use App\Entity\Cliente;
use App\Entity\Merchandising;
use App\Entity\Pedido;
use App\Entity\Producto;
use App\Entity\Tatuaje;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // return parent::index();

        // Option 1. You can make your dashboard redirect to some common page of your backend
        //
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);
        return $this->redirect($adminUrlGenerator->setController(ProductoCrudController::class)->generateUrl());

        // Option 2. You can make your dashboard redirect to different pages depending on the user
        //
        // if ('jane' === $this->getUser()->getUsername()) {
        //     return $this->redirect('...');
        // }

        // Option 3. You can render some custom template to display a proper dashboard with widgets, etc.
        // (tip: it's easier if your template extends from @EasyAdmin/page/content.html.twig)
        //
        // return $this->render('some/path/my-dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<img src="./images/bannerAdmin.jpg"> GASSINKTATTOO <span class="text-small"></span>')
            ->setLocales(['es', 'en', 'fr']);
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Clientes', 'fa-solid fa-user', Cliente::class);
        yield MenuItem::linkToCrud('Productos', 'fa-solid fa-droplet', Producto::class);
        yield MenuItem::linkToCrud('Merchandising', 'fa-solid fa-shirt', Merchandising::class);
        yield MenuItem::linkToCrud('Tatuajes', 'fa-solid fa-pencil', Tatuaje::class);
        yield MenuItem::linkToCrud('Pedidos', 'fa-solid fa-box', Pedido::class);
        yield MenuItem::linkToCrud('Citas', 'fa-solid fa-envelope', Cita::class);
        yield MenuItem::linkToCrud('Carrito', 'fa-solid fa-cart-shopping', Carrito::class);
    }
}
