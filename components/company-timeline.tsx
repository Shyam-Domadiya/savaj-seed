"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Package, Award, TrendingUp, Calendar } from 'lucide-react';
import { CompanyMilestone } from '@/lib/types/certifications';
import { cn } from '@/lib/utils';

interface CompanyTimelineProps {
  milestones: CompanyMilestone[];
  className?: string;
}

const categoryIcons = {
  Foundation: Building,
  Product: Package,
  Award: Award,
  Expansion: TrendingUp,
};

const categoryColors = {
  Foundation: 'bg-purple-100 text-purple-800 border-purple-200',
  Product: 'bg-blue-100 text-blue-800 border-blue-200',
  Award: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Expansion: 'bg-green-100 text-green-800 border-green-200',
};

export function CompanyTimeline({ milestones, className }: CompanyTimelineProps) {
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  // Sort milestones by year in descending order
  const sortedMilestones = [...milestones].sort((a, b) => b.year - a.year);

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          From humble beginnings to becoming a trusted name in agriculture, discover the milestones that shaped our story.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

        <div className="space-y-8">
          {sortedMilestones.map((milestone, index) => {
            const IconComponent = categoryIcons[milestone.category];
            const isHovered = hoveredMilestone === milestone.id;
            
            return (
              <div
                key={milestone.id}
                className={cn(
                  "relative flex items-start gap-6 group",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
                onMouseEnter={() => setHoveredMilestone(milestone.id)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10 items-center justify-center">
                  <div className="w-2 h-2 bg-background rounded-full" />
                </div>

                {/* Content card */}
                <Card 
                  className={cn(
                    "flex-1 max-w-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer border-border/50",
                    index % 2 === 0 ? "md:ml-16" : "md:mr-16",
                    isHovered && "shadow-xl scale-105"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300 flex-shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className="text-2xl font-bold text-primary">
                            {milestone.year}
                          </div>
                          <Badge 
                            variant="outline" 
                            className={cn("text-xs", categoryColors[milestone.category])}
                          >
                            {milestone.category}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                          {milestone.title}
                        </h3>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {milestone.description}
                        </p>
                        
                        {milestone.imageUrl && (
                          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted mt-4">
                            <Image
                              src={milestone.imageUrl}
                              alt={milestone.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}