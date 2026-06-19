package com.uade.tpo.e_commerce.config;

import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.uade.tpo.e_commerce.model.Address;
import com.uade.tpo.e_commerce.model.Category;
import com.uade.tpo.e_commerce.model.Product;
import com.uade.tpo.e_commerce.model.Role;
import com.uade.tpo.e_commerce.model.User;
import com.uade.tpo.e_commerce.repository.CategoryRepository;
import com.uade.tpo.e_commerce.repository.ProductRepository;
import com.uade.tpo.e_commerce.repository.UserRepository;

// Crea datos iniciales (admin, categorías y productos) la primera vez que levanta la app
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner seedData(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            seedAdmin(userRepository, passwordEncoder);

            // Si ya hay productos cargados no vuelve a ejecutar el seed
            if (productRepository.count() > 0) return;

            // Categorías
            Category notebooks   = categoryRepository.save(cat("Notebooks"));
            Category celulares   = categoryRepository.save(cat("Celulares"));
            Category tablets     = categoryRepository.save(cat("Tablets"));
            Category auriculares = categoryRepository.save(cat("Auriculares"));
            Category smartTv     = categoryRepository.save(cat("Smart TV"));
            Category consolas    = categoryRepository.save(cat("Consolas"));

            // Notebooks
            save(productRepository, "Apple MacBook Air M3",
                    "Pantalla Liquid Retina 13\" · Chip Apple M3 · 16GB RAM · 256GB SSD · Batería 18 hs",
                    1599.99, 10, img("nb_macbook_air_m3.jpg"), List.of(notebooks));

            save(productRepository, "Dell XPS 15 9530",
                    "Pantalla OLED 15.6\" · Intel Core i7 13a gen · NVIDIA RTX 4060 · 16GB RAM · 512GB SSD",
                    1899.99, 8, img("nb_dell_xps15.jpg"), List.of(notebooks));

            save(productRepository, "Lenovo ThinkPad X1 Carbon Gen 12",
                    "Pantalla 14\" IPS · Intel Core Ultra 7 · 32GB RAM · 1TB SSD · Ultra liviana 1.12 kg",
                    1749.99, 6, img("nb_thinkpad_x1.jpg"), List.of(notebooks));

            // Celulares
            save(productRepository, "Apple iPhone 16 Pro",
                    "Pantalla Super Retina XDR 6.3\" · Chip A18 Pro · Cámara 48MP · 256GB · Titanio",
                    1199.99, 20, img("ph_iphone16pro.jpg"), List.of(celulares));

            save(productRepository, "Samsung Galaxy S25 Ultra",
                    "Pantalla Dynamic AMOLED 6.9\" · Snapdragon 8 Elite · Cámara 200MP · S Pen incluido",
                    1299.99, 15, img("ph_galaxy_s25_ultra.jpg"), List.of(celulares));

            save(productRepository, "Xiaomi 14 Ultra",
                    "Pantalla LTPO AMOLED 6.73\" · Snapdragon 8 Gen 3 · Cámara Leica 50MP · 512GB",
                    999.99, 12, img("ph_xiaomi14ultra.jpg"), List.of(celulares));

            // Tablets
            save(productRepository, "Apple iPad Air M2",
                    "Pantalla Liquid Retina 11\" · Chip Apple M2 · Wi-Fi 6E · 128GB · Apple Pencil Pro",
                    749.99, 14, img("tb_ipad_air_m2.jpg"), List.of(tablets));

            save(productRepository, "Samsung Galaxy Tab S10 Ultra",
                    "Pantalla AMOLED 14.6\" · Snapdragon 8 Gen 3 · 12GB RAM · 256GB · S Pen incluido",
                    1099.99, 9, img("tb_galaxy_tab_s10.jpg"), List.of(tablets));

            save(productRepository, "Microsoft Surface Pro 11",
                    "Pantalla PixelSense 13\" · Intel Core Ultra 5 · 16GB RAM · 256GB SSD · Copilot+ PC",
                    1299.99, 7, img("tb_surface_pro11.jpg"), List.of(tablets));

            // Auriculares
            save(productRepository, "Sony WH-1000XM5",
                    "Over-ear · Cancelación de ruido líder · 30 hs de batería · LDAC · Multipoint",
                    379.99, 25, img("au_sony_xm5.jpg"), List.of(auriculares));

            save(productRepository, "Apple AirPods Pro 2",
                    "In-ear · ANC adaptativo · Chip H2 · Audio espacial personalizado · Estuche USB-C",
                    249.99, 30, img("au_airpods_pro2.jpg"), List.of(auriculares));

            save(productRepository, "Bose QuietComfort Ultra",
                    "Over-ear · Immersive Audio · ANC líder · 24 hs batería · Comodidad premium",
                    429.99, 18, img("au_bose_qc_ultra.jpg"), List.of(auriculares));

            // Smart TV
            save(productRepository, "Samsung QLED Q80D 55\"",
                    "Panel QLED 4K · 120Hz · Quantum HDR · Tizen OS · 4x HDMI 2.1 · Dolby Atmos",
                    799.99, 10, img("tv_samsung_q80d.jpg"), List.of(smartTv));

            save(productRepository, "LG OLED C4 55\"",
                    "Panel OLED 4K · 120Hz · α9 AI Gen7 · WebOS 24 · Perfect Black · FreeSync Premium",
                    1299.99, 8, img("tv_lg_oled_c4.jpg"), List.of(smartTv));

            save(productRepository, "Sony Bravia 7 65\"",
                    "Panel Mini LED 4K · XR Backlight Master Drive · Google TV · 120Hz · Dolby Vision",
                    1599.99, 5, img("tv_sony_bravia7.jpg"), List.of(smartTv));

            // Consolas
            save(productRepository, "Sony PlayStation 5 Slim",
                    "4K · 1TB SSD · Lector Blu-ray · DualSense con haptics · Retrocompatible PS4",
                    499.99, 20, img("con_ps5_slim.jpg"), List.of(consolas));

            save(productRepository, "Microsoft Xbox Series X",
                    "4K 120fps · 1TB SSD personalizado · Quick Resume · Game Pass Ultimate",
                    499.99, 18, img("con_xbox_series_x.jpg"), List.of(consolas));

            save(productRepository, "Nintendo Switch OLED",
                    "Pantalla OLED 7\" · Modo portátil, sobremesa y TV · 64GB · Joy-Con incluidos",
                    349.99, 25, img("con_switch_oled.jpg"), List.of(consolas));

            System.out.println(">>> Seed completado: 6 categorías, 18 productos");
        };
    }

    private void seedAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        if (userRepository.findByEmail("admin@admin.com").isPresent()) return;

        userRepository.save(User.builder()
                .name("Admin")
                .email("admin@admin.com")
                .password(passwordEncoder.encode("admin"))
                .role(Role.ADMIN)
                .dateOB(LocalDate.of(2000, 1, 1))
                .address(Address.builder()
                        .street("Admin 123")
                        .city("Buenos Aires")
                        .province("Buenos Aires")
                        .postalCode("1000")
                        .build())
                .build());

        System.out.println(">>> Usuario admin creado: admin@admin.com / admin");
    }

    private Category cat(String name) {
        return Category.builder().name(name).build();
    }

    private String img(String filename) {
        return "/api/images/" + filename;
    }

    private void save(ProductRepository repo, String name, String desc,
                      double price, int stock, String image, List<Category> categories) {
        repo.save(Product.builder()
                .name(name)
                .description(desc)
                .price(price)
                .stock(stock)
                .image(image)
                .categories(categories)
                .build());
    }
}
