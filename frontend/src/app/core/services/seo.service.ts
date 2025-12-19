import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * SEO Service
 * خدمة إدارة SEO Meta Tags
 */
@Injectable({
    providedIn: 'root'
})
export class SeoService {
    private defaultTitle = 'Your Uni - منصة الدراسة في الخارج';
    private defaultDescription = 'منصة شاملة للطلاب الراغبين في الدراسة بالخارج. اكتشف أفضل الجامعات والتخصصات واحصل على استشارات مجانية.';
    private defaultKeywords = 'دراسة في الخارج، جامعات، تخصصات، استشارات تعليمية، قبولات جامعية';

    constructor(
        private titleService: Title,
        private metaService: Meta
    ) { }

    /**
     * Set page title and meta tags
     */
    setPageMeta(config: {
        title?: string;
        description?: string;
        keywords?: string;
        image?: string;
    }): void {
        const title = config.title ? `${config.title} | Your Uni` : this.defaultTitle;
        const description = config.description || this.defaultDescription;
        const keywords = config.keywords || this.defaultKeywords;

        // Set title
        this.titleService.setTitle(title);

        // Set meta tags
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ name: 'keywords', content: keywords });

        // Open Graph tags
        this.metaService.updateTag({ property: 'og:title', content: title });
        this.metaService.updateTag({ property: 'og:description', content: description });
        this.metaService.updateTag({ property: 'og:type', content: 'website' });

        if (config.image) {
            this.metaService.updateTag({ property: 'og:image', content: config.image });
        }

        // Twitter Card tags
        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.metaService.updateTag({ name: 'twitter:title', content: title });
        this.metaService.updateTag({ name: 'twitter:description', content: description });

        if (config.image) {
            this.metaService.updateTag({ name: 'twitter:image', content: config.image });
        }
    }

    /**
     * Reset to default meta tags
     */
    resetMeta(): void {
        this.setPageMeta({});
    }
}
