"use client"

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Building,
  FileText,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin
} from 'lucide-react';
import { businessInfo } from '@/lib/data/team';
import { cn } from '@/lib/utils';

interface BusinessInfoProps {
  className?: string;
  showSocialMedia?: boolean;
  showRegistration?: boolean;
}

export function BusinessInfo({
  className,
  showSocialMedia = true,
  showRegistration = true
}: BusinessInfoProps) {
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    linkedin: Linkedin,
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Address</h4>
              <div className="text-muted-foreground space-y-1">
                <p>{businessInfo.address.street}</p>
                <p>{businessInfo.address.city}, {businessInfo.address.state}</p>
                <p>{businessInfo.address.pincode}, {businessInfo.address.country}</p>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Phone Numbers</h4>
              <div className="space-y-2">
                {businessInfo.contact.phone.map((phone, index) => (
                  <Link
                    key={index}
                    href={`tel:${phone}`}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {phone}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Email Addresses</h4>
              <div className="space-y-2">
                {businessInfo.contact.email.map((email, index) => (
                  <Link
                    key={index}
                    href={`mailto:${email}`}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {email}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          {businessInfo.contact.whatsapp && (
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-100 text-green-600 flex-shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">WhatsApp</h4>
                <Link
                  href={`https://wa.me/${businessInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-green-600 transition-colors duration-300"
                >
                  {businessInfo.contact.whatsapp}
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>



      {/* Business Registration */}
      {showRegistration && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Business Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold mb-1">Company Name</h4>
              <p className="text-muted-foreground">{businessInfo.companyName}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Established</h4>
              <p className="text-muted-foreground">{businessInfo.establishedYear}</p>
            </div>
            {businessInfo.registrationNumber && (
              <div>
                <h4 className="font-semibold mb-1">Registration Number</h4>
                <p className="text-muted-foreground text-sm">{businessInfo.registrationNumber}</p>
              </div>
            )}
            <div>
              <h4 className="font-semibold mb-1">GST Number</h4>
              <p className="text-muted-foreground text-sm">{businessInfo.gstNumber}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Media */}
      {showSocialMedia && (
        <Card>
          <CardHeader>
            <CardTitle>Follow Us</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(businessInfo.socialMedia).map(([platform, url]) => {
                if (!url) return null;
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                return (
                  <Button
                    key={platform}
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      <IconComponent className="w-4 h-4 mr-2" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}