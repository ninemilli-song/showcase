import Link from 'next/link';

interface Template {
  id: number;
  title: string;
  description: string;
  author: string;
  tags: string[];
  category: string;
  demoUrl: string;
  repoUrl: string;
  image: string;
  stars: number;
}

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:shadow-lg">
      {/* 预览图 */}
      <div className="relative h-48 bg-gray-100 border-b">
        <img 
          src={template.image} 
          alt={template.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded text-sm font-medium">
          {template.stars.toLocaleString()} ★
        </div>
      </div>
      
      {/* 内容区 */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-1">{template.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {template.description}
        </p>
        
        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* 作者信息 */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">by {template.author}</span>
          
          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Link 
              href={template.demoUrl} 
              target="_blank"
              className="px-3 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            >
              Demo
            </Link>
            <Link 
              href={template.repoUrl} 
              target="_blank"
              className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 transition"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
