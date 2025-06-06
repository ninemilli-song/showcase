'use client';
// import Hero from "@/components/hero";
// import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
// import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { useState } from 'react';
import TemplateCard from '@/components/template-card';
import FilterBar from '@/components/filter-bar';
import { templates, categories } from '@/data/templates';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 过滤模板
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    
    const matchesSearch = 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Next.js 模板市场</h1>
        <p className="text-gray-600 text-xl">
          精选高质量 Next.js 模板，加速你的项目开发
        </p>
      </div>
      
      <FilterBar 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSearchChange={setSearchQuery}
      />
      
      {/* 模板网格 */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">未找到匹配模板</h3>
          <p className="text-gray-600">尝试其他搜索关键词或分类</p>
        </div>
      )}
    </div>
  );
  // return (
  //   <>
  //     <Hero />
  //     <main className="flex-1 flex flex-col gap-6 px-4">
  //       <h2 className="font-medium text-xl mb-4">Next steps</h2>
  //       {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
  //     </main>
  //   </>
  // );
}
