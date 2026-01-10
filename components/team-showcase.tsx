"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Linkedin, Users, GraduationCap, Briefcase } from 'lucide-react';
import { TeamMember } from '@/lib/types/team';
import { cn } from '@/lib/utils';

interface TeamShowcaseProps {
  teamMembers: TeamMember[];
  showAll?: boolean;
  className?: string;
}

export function TeamShowcase({ teamMembers, showAll = false, className }: TeamShowcaseProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAllMembers, setShowAllMembers] = useState(showAll);

  const displayedMembers = showAllMembers ? teamMembers : teamMembers.slice(0, 4);

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
          <Users className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Meet Our Expert Team</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our dedicated team of agricultural experts, researchers, and professionals are committed to your farming success.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedMembers.map((member) => (
          <Card
            key={member.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-border/50"
            onClick={() => handleMemberClick(member)}
          >
            <CardHeader className="text-center space-y-4">
              <div className="relative mx-auto">
                <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </CardTitle>
                <p className="text-sm text-primary font-medium">{member.position}</p>
                <Badge variant="outline" className="text-xs">
                  {member.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {member.bio}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Briefcase className="w-3 h-3" />
                <span>{member.experience}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!showAll && teamMembers.length > 4 && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={() => setShowAllMembers(!showAllMembers)}
            className="hover:scale-105 transition-transform duration-300"
          >
            {showAllMembers ? 'Show Less' : `View All ${teamMembers.length} Team Members`}
          </Button>
        </div>
      )}

      {/* Team Member Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={closeModal}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                  <Image
                    src={selectedMember.imageUrl}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <CardTitle className="text-2xl">{selectedMember.name}</CardTitle>
                    <p className="text-lg text-primary font-medium mt-1">{selectedMember.position}</p>
                    <Badge variant="outline" className="mt-2">
                      {selectedMember.department}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-3">
                    {selectedMember.email && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`mailto:${selectedMember.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Link>
                      </Button>
                    )}
                    {selectedMember.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">About</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold">Experience</h4>
                  </div>
                  <p className="text-muted-foreground">{selectedMember.experience}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <h4 className="font-semibold">Education</h4>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{selectedMember.education}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={closeModal} className="w-full">
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}