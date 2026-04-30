import { RecommendationForm } from './form';

export default function RecommendationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Assistente Jurídico com IA</h1>
        <p className="text-muted-foreground">
          Obtenha recomendações personalizadas de documentos jurídicos. Descreva seu caso e
          perfil, e nossa IA sugerirá modelos relevantes.
        </p>
      </div>
      <RecommendationForm />
    </div>
  );
}
