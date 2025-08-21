'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RefreshCw, X, ChevronDown, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFindAnswersDetailById } from '@/services/findAnswersService';

interface Article {
    id: string;
    policyName: string;
    content: string;
    category: string;
    url?: string;
    lastUpdated: string;
    author: string;
}

interface FindAnswersData {
    _id: { $oid: string };
    id: string;
    title: string;
    description: string;
    learnMoreLink?: string;
    scenario?: string;
    actions?: string[];
    articles: Article[];
}

interface FindAnswersPanelProps {
    findAnswersId: string;
    onClose: () => void;
}

export function FindAnswersPanel({ findAnswersId, onClose }: FindAnswersPanelProps) {
    console.log('FindAnswersPanel mounted with ID:', findAnswersId);
    const [data, setData] = useState<FindAnswersData | null>(null);
    const [loading, setLoading] = useState(true);
    const [openArticles, setOpenArticles] = useState<Set<string>>(new Set());
    const [showDebug, setShowDebug] = useState(false);

    useEffect(() => {
        loadFindAnswersData();
    }, [findAnswersId]);

    const loadFindAnswersData = async () => {
        console.log('Loading find answers data for ID:', findAnswersId);
        setLoading(true);
        try {
            const detailData = await getFindAnswersDetailById(findAnswersId);
            console.log('Loaded find answers data:', detailData);
            setData(detailData);
        } catch (error) {
            console.error('Failed to load find answers data:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleArticle = (articleId: string) => {
        const newOpenArticles = new Set(openArticles);
        if (newOpenArticles.has(articleId)) {
            newOpenArticles.delete(articleId);
        } else {
            newOpenArticles.add(articleId);
        }
        setOpenArticles(newOpenArticles);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric', 
            day: 'numeric'
        });
    };

    console.log('FindAnswersPanel render state:', { loading, hasData: !!data, dataTitle: data?.title });

    if (loading) {
        console.log('Rendering loading state');
        return (
            <div className="flex-1 bg-gray-50 overflow-auto">
                <div className="w-full p-6 pr-8 flex items-center justify-center h-64">
                    <div className="flex items-center space-x-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Loading Find Answers...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex-1 bg-gray-50 overflow-auto">
                <div className="w-full p-6 pr-8 flex items-center justify-center h-64">
                    <span className="text-gray-500">No data found for {findAnswersId}</span>
                </div>
            </div>
        );
    }

    console.log('Rendering main content with data:', data);
    return (
        <div className="flex-1 bg-gray-50 overflow-auto">
            <div className="w-full p-6 pr-8">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed">{data.description}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={loadFindAnswersData}
                            className="flex items-center space-x-2 px-3 py-2"
                            title="Refresh knowledge articles"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span className="text-sm">Refresh</span>
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600"
                            title="Close panel"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Try It Yourself Section */}
                {data.scenario && (
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 mb-8">
                        <div className="flex items-start space-x-3 mb-4">
                            <Sparkles className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <h2 className="text-lg font-semibold text-orange-900">Try it yourself!</h2>
                        </div>
                        <div className="text-gray-700 mb-4">
                            <p className="mb-4">{data.scenario}</p>
                            {data.actions && (
                                <ul className="space-y-2 ml-4">
                                    {data.actions.map((action, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                            <span>{action}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* Articles Section */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                        Here are the sample articles that power the answers about your questions
                    </h3>
                    
                    <div className="space-y-3">
                        {data.articles.map((article) => (
                            <Collapsible
                                key={article.id}
                                open={openArticles.has(article.id)}
                                onOpenChange={() => toggleArticle(article.id)}
                            >
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <CollapsibleTrigger asChild>
                                        <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                                            <span className="font-medium text-gray-900">{article.policyName}</span>
                                            {openArticles.has(article.id) ? 
                                                <ChevronDown className="w-5 h-5 text-gray-400" /> : 
                                                <ChevronRight className="w-5 h-5 text-gray-400" />
                                            }
                                        </button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="px-4 pb-4">
                                        <p className="text-gray-700 mb-3">{article.content}</p>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                {article.category}
                                            </span>
                                            <span>Author: {article.author}</span>
                                            <span>Updated: {formatDate(article.lastUpdated)}</span>
                                            {article.url && (
                                                <a href={article.url} className="text-orange-600 hover:text-orange-700 hover:underline">
                                                    View Full Article
                                                </a>
                                            )}
                                        </div>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>
                        ))}
                    </div>
                </div>

                {/* Learn More Link */}
                {data.learnMoreLink && (
                    <div className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors cursor-pointer mb-8">
                        <ChevronRight className="w-4 h-4" />
                        <span className="font-medium">{data.learnMoreLink}</span>
                    </div>
                )}

                {/* Debug Section */}
                <div className="mt-8">
                    <Collapsible open={showDebug} onOpenChange={setShowDebug}>
                        <CollapsibleTrigger asChild>
                            <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-gray-600 transition-colors mb-2">
                                <HelpCircle className="w-4 h-4" />
                                <span>Debug Information</span>
                            </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2 p-3 bg-gray-100 rounded text-xs space-y-1 text-gray-600">
                            <div><strong>Debug Info:</strong> Successfully loaded: {data.title}</div>
                            <div><strong>Section:</strong> {data.id}</div>
                            <div><strong>Assistant ID:</strong> None (will use ODIN)</div>
                            <div><strong>Has Data:</strong> Yes</div>
                            <div><strong>Title:</strong> {data.title}</div>
                            <div><strong>Articles Count:</strong> {data.articles.length}</div>
                            <div><strong>Try It Yourself:</strong> {data.scenario ? 'Yes' : 'No'}</div>
                            <div><strong>Assistant ID from Data:</strong> Not specified</div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </div>
    );
}