"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Shield, Award, Leaf, CheckCircle } from 'lucide-react';
import { Certification } from '@/lib/types/certifications';
import { cn, formatDate } from '@/lib/utils';

interface CertificationsShowcaseProps {
  certifications: Certification[];
  className?: string;
}

const categoryIcons = {
  Quality: Shield,
  Organic: Leaf,
  Safety: CheckCircle,
  Environmental: Leaf,
};

const categoryColors = {
  Quality: 'bg-blue-100 text-blue-800 border-blue-200',
  Organic: 'bg-green-100 text-green-800 border-green-200',
  Safety: 'bg-orange-100 text-orange-800 border-orange-200',
  Environmental: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export function CertificationsShowcase({ certifications, className }: CertificationsShowcaseProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const isExpiringSoon = (expiryDate?: Date) => {
    if (!expiryDate) return false;
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiryDate < sixMonthsFromNow;
  };

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
          <Award className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Our Certifications</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We maintain the highest standards of quality and compliance through rigorous certifications and regular audits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => {
          const IconComponent = categoryIcons[cert.category];
          const isHovered = hoveredCard === cert.id;
          
          return (
            <Card
              key={cert.id}
              className={cn(
                "group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-border/50",
                isHovered && "shadow-xl scale-105"
              )}
              onMouseEnter={() => setHoveredCard(cert.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {cert.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-xs", categoryColors[cert.category])}
                  >
                    {cert.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={cert.imageUrl}
                    alt={cert.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Issued:</span>
                    <span>{formatDate(cert.dateIssued)}</span>
                  </div>
                  {cert.expiryDate && (
                    <div className="flex justify-between">
                      <span>Expires:</span>
                      <span className={cn(
                        isExpiringSoon(cert.expiryDate) && "text-orange-600 font-medium"
                      )}>
                        {formatDate(cert.expiryDate)}
                      </span>
                    </div>
                  )}
                </div>

                {cert.verificationUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    <Link 
                      href={cert.verificationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Verify Certificate
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}